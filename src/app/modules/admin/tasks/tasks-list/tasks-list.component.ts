import { TasksDetailsComponent } from './../tasks-details/tasks-details.component';
import { EditTaskComponent } from './../edit-task/edit-task.component';
import { ResponseMessage } from './../../../../models/interfaces/ResponseMessage';
import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TasksModel } from '../../../../models/interfaces/tasks/TasksModel';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { Subject, takeUntil } from 'rxjs';
import { UsersNameModel } from '../../../../models/interfaces/users/response/UsersNameModel';
import { ProjectsNameModel } from '../../../../models/interfaces/projects/response/ProjectsNameModel';
import { ProjectsService } from '../../../../services/projects/projects.service';
import { ProfilesService } from '../../../../services/profiles/profiles.service';
import { NotificationService } from '../../../../services/notification/notification.service';
import { DatePipe } from '@angular/common';
import { TasksService } from '../../../../services/tasks/tasks.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { presetColors } from 'ng-zorro-antd/core/color';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks-list',
  imports: [
    NzTableModule,
    NzIconModule,
    NzButtonModule,
    NzModalModule,
    NzPopconfirmModule,
    NzTagModule,
    EditTaskComponent,
    TasksDetailsComponent,
    NzTypographyModule,
    CommonModule,
  ],
  providers: [DatePipe],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.less',
})
export class TasksListComponent implements OnInit, OnDestroy {
  tasksData: TasksModel[] = [];
  private destroy$ = new Subject<void>();
  usersData!: UsersNameModel[];
  projectsData!: ProjectsNameModel[];
  taskSelected!: TasksModel;
  readonly presetColors = presetColors;
  loadingTasks: { [key: string]: boolean } = {};

  isModalVisible = false;
  modalTitle = '';
  modalContent!: TemplateRef<any>;

  constructor(
    private projectsService: ProjectsService,
    private profilesServices: ProfilesService,
    private notification: NotificationService,
    private tasksService: TasksService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.tasksService.tasks$
      .pipe(takeUntil(this.destroy$))
      .subscribe((tasks) => (this.tasksData = tasks));

    this.tasksService.getAllTasks().subscribe();

    this.projectsService
      .getAllProjectsName()
      .subscribe((projects) => (this.projectsData = projects));

    this.profilesServices.getAllUsersName().subscribe((users) => {
      this.usersData = users;
    });
  }

  atividadeAtrasada(data: TasksModel): boolean {
    return (
      new Date(data.dataFim) < new Date() &&
      data.status !== 'PAUSADA' &&
      data.status !== 'CONCLUIDA'
    );
  }

  dateFormater(date: Date): string | null {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  deleteTask(id: number): void {
    this.loadingTasks[id] = true;
    setTimeout(() => {
      this.tasksService.deleteTask(id).subscribe({
        next: (response: ResponseMessage) => {
          this.notification.successNotification(response.message);
        },
        error: (error: HttpErrorResponse) => {
          this.notification.errorNotification(error.error.message);
        },
      });
    }, 500);
  }

  @ViewChild('editTask', { static: true })
  EditTaskComponent!: TemplateRef<any>;

  @ViewChild('taskDetails', { static: true })
  TasksDetailsComponent!: TemplateRef<any>;

  showModal(tipo: string, task: TasksModel): void {
    this.taskSelected = task;
    this.isModalVisible = true;

    switch (tipo) {
      case 'taskDetails':
        this.modalTitle = this.taskSelected.nome;
        this.modalContent;
        this.modalContent = this.TasksDetailsComponent;
        break;

      case 'editTask':
        this.modalTitle = 'Editar Atividade';
        this.modalContent = this.EditTaskComponent;
        break;
    }
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
