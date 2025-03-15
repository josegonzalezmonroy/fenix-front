import { ResponseMessage } from './../../../../models/interfaces/ResponseMessage';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HoursModel } from '../../../../models/interfaces/hours/HoursModel';
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
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { UsersNameModel } from '../../../../models/interfaces/users/response/UsersNameModel';
import { ProjectsNameModel } from '../../../../models/interfaces/projects/response/ProjectsNameModel';
import { TasksNameModel } from '../../../../models/interfaces/tasks/TasksNameModel';
import { ProjectsService } from '../../../../services/projects/projects.service';
import { ProfilesService } from '../../../../services/profiles/profiles.service';
import { TasksService } from '../../../../services/tasks/tasks.service';
import { HoursService } from '../../../../services/hours/hours.service';
import { NotificationService } from '../../../../services/notification/notification.service';
import { HoursEditModel } from '../../../../models/interfaces/hours/HoursEditModel';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-hours',
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
  templateUrl: './edit-hours.component.html',
  styleUrl: './edit-hours.component.less',
})
export class EditHoursComponent implements OnInit {
  @Input() hourEdit!: HoursModel;
  @Output() closeModal = new EventEmitter<void>();

  hoursEditForm!: FormGroup;

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
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.profilesService.getAllUsersName().subscribe({
      next: (users) => {
        this.profilesName = users;
      },
      error: () => {
        this.notification.errorNotification("Erro ao carregar usuários");
      },
    });

    this.projectsService.getAllProjectsName().subscribe({
      next: (projects) => {
        this.projectsName = projects;
      },
      error: () => {
        this.notification.errorNotification("Erro ao carregar projetos");
      },
    });

    this.tasksService.getAllTasksName().subscribe({
      next: (tasks) => {
        this.tasksName = tasks;
      },
      error: () => {
        this.notification.errorNotification("Erro ao carregar atividades");
      },
    });

    this.hoursEditForm = new FormGroup({
      id_atividade: new FormControl<number>(this.hourEdit.atividade.id),
      id_usuario: new FormControl<number>(this.hourEdit.usuario.id),
      descricao: new FormControl<string>(this.hourEdit.descricao, [
        Validators.required,
      ]),
      data_inicio: new FormControl<Date | null>(
        new Date(this.hourEdit.dataInicio),
        [Validators.required]
      ),
      data_fim: new FormControl<Date | null>(new Date(this.hourEdit.dataFim), [
        Validators.required,
      ]),
    });

    this.selectedDate = this.hourEdit.dataInicio;
  }

  onSubmit(): void {
    if (this.hoursEditForm.valid && this.selectedDate) {
      this.isConfirmLoading = true;
      this.hoursService
        .updateHour(this.hourEdit.id, this.hoursEditForm.value as HoursEditModel)
        .subscribe({
          next: (response: ResponseMessage) => {
            setTimeout(() => {
              this.hoursEditForm.reset();
              this.closeModal.emit();
              this.notification.successNotification(
                response.message
              );
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
      const control = this.hoursEditForm.get(controlName);
      if (control) {
        control.setValue(control.value, { emitEvent: true });
      }
      this.onValidateHour();
    }
  }

  onDateChange(newDate: Date): void {
    this.selectedDate = newDate;
    this.onValidateHour();
  }

  onValidateHour(): void {
    const dataInicio = this.hoursEditForm.get('data_inicio')?.value;
    const dataFim = this.hoursEditForm.get('data_fim')?.value;

    if (this.selectedDate) {
      if (dataInicio) {
        const dataHoraInicio = this.combineDateAndTime(
          this.selectedDate,
          dataInicio
        );
        this.hoursEditForm.get('data_inicio')?.setValue(dataHoraInicio);
      }

      if (dataFim) {
        const dataHoraFim = this.combineDateAndTime(this.selectedDate, dataFim);
        this.hoursEditForm.get('data_fim')?.setValue(dataHoraFim);
      }

      const newDataInicio = this.hoursEditForm.get('data_inicio')?.value;
      const newDataFim = this.hoursEditForm.get('data_fim')?.value;

      if (newDataInicio && newDataFim) {
        if (newDataInicio.getTime() > newDataFim.getTime()) {
          this.hoursEditForm.get('data_inicio')?.setValue(null);
          this.tempoTotal = '';
        } else {
          const segundosTotais = this.horasTotais(newDataInicio, newDataFim);
          this.hoursEditForm.get('segundos_totais')?.setValue(segundosTotais);
          this.tempoTotal = this.segundosParaHHmm(segundosTotais);
        }
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
