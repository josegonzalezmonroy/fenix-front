import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { ProjectsNameModel } from '../../../../models/interfaces/projects/response/ProjectsNameModel';
import { TasksNameModel } from '../../../../models/interfaces/tasks/TasksNameModel';
import { ProjectsService } from '../../../../services/projects/projects.service';
import { ProfilesService } from '../../../../services/profiles/profiles.service';
import { TasksService } from '../../../../services/tasks/tasks.service';
import { HoursService } from '../../../../services/hours/hours.service';
import { NotificationService } from '../../../../services/notification/notification.service';
import { HoursModel } from '../../../../models/interfaces/hours/HoursModel';
import { ResponseMessage } from '../../../../models/interfaces/ResponseMessage';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-cadastro-hours-user',
  imports: [
    FormsModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    NzTimePickerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './cadastro-hours-user.component.html',
  styleUrl: './cadastro-hours-user.component.less',
})
export class CadastroHoursUserComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();

  isConfirmLoading = false;
  tasksName: Array<TasksNameModel> = [];
  projectsByProfile: Array<ProjectsNameModel> = [];

  selectedDate: Date | null = null;
  tempoTotal: string = '-';

  constructor(
    private projectsService: ProjectsService,
    private profilesService: ProfilesService,
    private tasksService: TasksService,
    private hoursService: HoursService,
    private notification: NotificationService,
    private authService: AuthService
  ) {}

  hoursForm = new FormGroup({
    projeto: new FormControl<number | null>(null),
    id_atividade: new FormControl<number | null>(null, [Validators.required]),
    id_usuario: new FormControl<number | null>(null, [Validators.required]),
    descricao: new FormControl<string>('', [Validators.required]),
    data_inicio: new FormControl<Date | null>(null, [Validators.required]),
    data_fim: new FormControl<Date | null>(null, [Validators.required]),
    segundos_totais: new FormControl(0, [Validators.required]),
  });

  ngOnInit(): void {
    if (this.authService.getUserId()) {
      this.hoursForm.patchValue({
        id_usuario: this.authService.getUserId(),
      });
    }

    this.projectsService.getAllProjectsOfScopeUsuario().subscribe({
      next: (users) => {
        this.projectsByProfile = users;
      },
      error: () => {
        this.notification.errorNotification(
          'Erro ao carregar projetos do usuario'
        );
      },
    });

    this.hoursForm.get('data_inicio')?.valueChanges.subscribe(() => {
      this.onValidateHour();
    });

    this.hoursForm.get('data_fim')?.valueChanges.subscribe(() => {
      this.onValidateHour();
    });

    this.hoursForm.get('projeto')?.valueChanges.subscribe((projectId) => {
      if (projectId) {
        this.loadTaskByProject(projectId);
        this.hoursForm.patchValue({
          id_atividade: null,
        });
      } else {
        this.projectsByProfile = [];
      }
    });
  }

  loadTaskByProject(projetoId: number): void {
    this.tasksService.getTaskByProjectScopeUsuario(projetoId).subscribe({
      next: (tasks) => {
        this.tasksName = tasks;
      },
      error: () => {
        this.notification.errorNotification(
          'Erro ao carregar atividades do usuario'
        );
      },
    });
  }

  onSubmit(): void {
    if (this.hoursForm.valid && this.selectedDate) {
      const dataHoraInicio = this.combineDateAndTime(
        this.selectedDate,
        this.hoursForm.value.data_inicio as Date
      );

      const dataHoraFim = this.combineDateAndTime(
        this.selectedDate,
        this.hoursForm.value.data_fim as Date
      );

      this.hoursForm.value.data_fim = dataHoraFim;
      this.hoursForm.value.data_inicio = dataHoraInicio;

      this.isConfirmLoading = true;
      this.hoursService
        .registerHourScopeUser(this.hoursForm.value as HoursModel)
        .subscribe({
          next: (response: ResponseMessage) => {
            setTimeout(() => {
              this.hoursForm.reset();
              this.closeModal.emit();
              this.notification.successNotification(response.message);
              this.isConfirmLoading = false;
            }, 500);
          },
          error: (error: HttpErrorResponse) => {
            this.isConfirmLoading = false;
            this.notification.errorNotification(error.error.message);
          },
        });
    }
  }

  onTimePickerChange(controlName: string, isOpen: boolean): void {
    if (!isOpen) {
      const control = this.hoursForm.get(controlName);
      if (control) {
        control.setValue(control.value, { emitEvent: true });
      }
      this.onValidateHour();
    }
  }

  onValidateHour(): void {
    const dataInicio = this.hoursForm.value.data_inicio;
    const dataFim = this.hoursForm.value.data_fim;

    if (dataInicio && dataFim) {
      if (dataInicio > dataFim) {
        this.hoursForm.get('data_inicio')?.setValue(null, { emitEvent: false });
        this.tempoTotal = '';
      } else {
        this.hoursForm
          .get('segundos_totais')
          ?.setValue(this.horasTotais(dataInicio!, dataFim!));
        this.tempoTotal = this.segundosParaHHmm(
          this.horasTotais(dataInicio!, dataFim!)
        );
      }
    }
  }

  combineDateAndTime(date: Date, time: Date): Date {
    const combinedDate = new Date(date);
    combinedDate.setHours(time.getHours(), time.getMinutes(), 0, 0);
    return combinedDate;
  }

  horasTotais(inicio: Date, fim: Date): number {
    const tempoTotalSegundos = Math.floor(
      (fim.setSeconds(0, 0) - inicio.setSeconds(0, 0)) / 1000
    );
    this.segundosParaHHmm(tempoTotalSegundos);
    return tempoTotalSegundos;
  }

  segundosParaHHmm(segundos: number): string {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const horasFormatadas = String(horas).padStart(2, '0');
    const minutosFormatados = String(minutos).padStart(2, '0');

    return `${horasFormatadas} horas e ${minutosFormatados} minutos`;
  }
}
