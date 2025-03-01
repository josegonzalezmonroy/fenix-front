import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { ProjectsService } from '../../../../services/projects/projects.service';
import { ProfilesService } from '../../../../services/profiles/profiles.service';
import { NotificationService } from '../../../../services/notification/notification.service';
import { DatePipe } from '@angular/common';
import { EditHoursComponent } from '../edit-hours/edit-hours.component';
import { HoursModel } from '../../../../models/interfaces/hours/HoursModel';
import { Observable, Subject, takeUntil } from 'rxjs';
import { UsersNameModel } from '../../../../models/interfaces/users/response/UsersNameModel';
import { HoursService } from '../../../../services/hours/hours.service';
import { ProjectsNameModel } from '../../../../models/interfaces/projects/response/ProjectsNameModel';
import { TasksNameModel } from '../../../../models/interfaces/tasks/TasksNameModel';
import { TasksService } from '../../../../services/tasks/tasks.service';

@Component({
  selector: 'app-hours-list',
  imports: [
    NzTableModule,
    NzIconModule,
    NzButtonModule,
    NzModalModule,
    NzPopconfirmModule,
    NzTagModule,
    EditHoursComponent,
  ],
  providers: [DatePipe],
  templateUrl: './hours-list.component.html',
  styleUrl: './hours-list.component.less',
})
export class HoursListComponent implements OnInit, OnDestroy {
  hoursData: HoursModel[] = [];
  private destroy$ = new Subject<void>();
  public userName$!: Observable<string>;
  usersData!: UsersNameModel[];
  projectsData!: ProjectsNameModel[];
  tasksData!: TasksNameModel[];

  isVisible = false;
  loadingHours: { [key: string]: boolean } = {};
  selectedHour!: HoursModel;

  constructor(
    private projectsService: ProjectsService,
    private profilesService: ProfilesService,
    private tasksService: TasksService,
    private hoursService: HoursService,
    private notification: NotificationService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.hoursService.hours$
      .pipe(takeUntil(this.destroy$))
      .subscribe((hours) => (this.hoursData = hours));

    this.hoursService.getAllHours().subscribe();

    this.projectsService
      .getAllProjectsName()
      .subscribe((projects) => (this.projectsData = projects));

    this.profilesService.getAllUsersName().subscribe((users) => {
      this.usersData = users;
    });

    this.tasksService.getAllTasksName().subscribe((tasks) => {
      this.tasksData = tasks;
    });
  }

  getUserName(userId: string): string {
    const user = this.usersData?.find((response) => response.id === userId);
    return user ? user.nome : 'Usuário não encontrado';
  }

  getProjectName(projectId: string): string {
    const project = this.projectsData?.find(
      (response) => response.id === projectId
    );
    return project ? project.nome : 'Projeto não encontrado';
  }

  getTaskName(taskId: string): string {
    const task = this.tasksData?.find((response) => response.id === taskId);
    return task ? task.nome : 'Atividade não encontrada';
  }

  dateFormater(date: Date): string | null {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  hourFormater(date: Date): string | null{
    return this.datePipe.transform(date, 'HH:mm')
  }

  segundosParaHHmm(segundos: number): string {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const horasFormatadas = String(horas).padStart(2, '0');
    const minutosFormatados = String(minutos).padStart(2, '0');

    return `${horasFormatadas} horas e ${minutosFormatados} minutos`;
  }

  deleteHour(id: string): void {
    this.loadingHours[id] = true;
    setTimeout(() => {
      this.hoursService.deleteHour(id).subscribe({
        next: () => {
          this.notification.successNotification(
            'Atividade deletada com sucesso!'
          );
        },
        error: () => {
          this.notification.errorNotification('Erro ao deletar atividade!');
        },
      });
    }, 500);
  }

  showModal(hour: HoursModel): void {
    this.selectedHour = hour;
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
