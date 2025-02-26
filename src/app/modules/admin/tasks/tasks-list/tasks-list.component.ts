import { Component, OnDestroy, OnInit } from '@angular/core';
import { TasksModel } from '../../../../models/interfaces/tasks/TasksModel';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { Subject, takeUntil } from 'rxjs';
import { UsersNameModel } from '../../../../models/interfaces/users/response/UsersNameModel';
import { ProjectsNameModel } from '../../../../models/interfaces/projects/response/ProjectsNameModel';
import { ProjectsService } from '../../../../services/projects/projects.service';
import { ProfilesService } from '../../../../services/profiles/profiles.service';
import { NotificationService } from '../../../../services/notification/notification.service';
import { DatePipe } from '@angular/common';
import { TasksService } from '../../../../services/tasks/tasks.service';

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
  selectedTask!: TasksModel;

  isVisible = false;
  loadingTasks: { [key: string]: boolean } = {};

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

    this.tasksService.getAllTasks().subscribe()

    this.projectsService
      .getAllProjectsName()
      .subscribe((projects) => (this.projectsData = projects));

    this.profilesServices.getAllUsersName().subscribe((users) => {
      this.usersData = users;
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

  dateFormater(date: string): string | null {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  deleteTask(id: string): void {
    this.loadingTasks[id] = true;
    setTimeout(() => {
      this.tasksService.deleteTask(id).subscribe({
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

  showModal(task: TasksModel): void {
    this.selectedTask = task;
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
