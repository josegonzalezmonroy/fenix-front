import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TasksNameModel } from '../../../../models/interfaces/tasks/TasksNameModel';
import { UsersNameModel } from '../../../../models/interfaces/users/response/UsersNameModel';
import { ProjectsNameModel } from '../../../../models/interfaces/projects/response/ProjectsNameModel';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { ProjectsService } from '../../../../services/projects/projects.service';
import { ProfilesService } from '../../../../services/profiles/profiles.service';
import { TasksService } from '../../../../services/tasks/tasks.service';
import { NotificationService } from '../../../../services/notification/notification.service';
import { HoursModel } from '../../../../models/interfaces/hours/HoursModel';
import { HoursService } from '../../../../services/hours/hours.service';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cadastro-hours',
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
  providers: [DatePipe],
  templateUrl: './cadastro-hours.component.html',
  styleUrl: './cadastro-hours.component.less',
})
export class CadastroHoursComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();

  isConfirmLoading = false;
  profilesName: Array<UsersNameModel> = [];
  projectsName: Array<ProjectsNameModel> = [];
  tasksName: Array<TasksNameModel> = [];

  selectedDate: Date | null = null;
  tempoTotal: string = '';

  constructor(
    private projectsService: ProjectsService,
    private profilesService: ProfilesService,
    private tasksService: TasksService,
    private hoursService: HoursService,
    private datePipe: DatePipe,
    private notification: NotificationService
  ) {}

  hoursForm = new FormGroup({
    id_atividade: new FormControl('', [Validators.required]),
    id_usuario: new FormControl('', [Validators.required]),
    descricao: new FormControl('', [Validators.required]),
    data_inicio: new FormControl<Date | null>(null, [Validators.required]),
    data_fim: new FormControl<Date | null>(null, [Validators.required]),
    segundos_totais: new FormControl(0, [Validators.required]),
    data_registro: new FormControl(new Date(), [Validators.required]),
  });

  ngOnInit(): void {
    this.profilesService.getAllUsersName().subscribe({
      next: (users) => {
        this.profilesName = users;
      },
      error: (erro) => {
        console.log('Erro:', erro);
      },
    });

    this.projectsService.getAllProjectsName().subscribe({
      next: (projects) => {
        this.projectsName = projects;
      },
      error: (erro) => {
        console.log('Erro:', erro);
      },
    });

    this.tasksService.getAllTasksName().subscribe({
      next: (tasks) => {
        this.tasksName = tasks;
      },
      error: (erro) => {
        console.log('Erro:', erro);
      },
    });

    this.hoursForm.get('data_inicio')?.valueChanges.subscribe(() => {
      this.onValidateHour();
    });

    this.hoursForm.get('data_fim')?.valueChanges.subscribe(() => {
      this.onValidateHour();
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
        .registerHour(this.hoursForm.value as HoursModel)
        .subscribe({
          next: () => {
            setTimeout(() => {
              console.log(this.hoursForm.value);
              this.hoursForm.reset();
              this.closeModal.emit();
              this.notification.successNotification('Hora lançada com sucesso');
              this.isConfirmLoading = false;
            }, 500);
          },
          error: () => {
            this.isConfirmLoading = false;
            this.notification.errorNotification('Erro ao lançar atividade');
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
