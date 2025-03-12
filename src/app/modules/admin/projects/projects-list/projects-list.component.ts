import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectsService } from '../../../../services/projects/projects.service';
import { NotificationService } from '../../../../services/notification/notification.service';
import { ProjectsModel } from '../../../../models/interfaces/projects/response/ProjectsModel';
import { Observable, Subject, takeUntil } from 'rxjs';
import { EditProjectComponent } from '../edit-project/edit-project.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { DatePipe } from '@angular/common';
import { ProfilesService } from '../../../../services/profiles/profiles.service';
import { UsersNameModel } from '../../../../models/interfaces/users/response/UsersNameModel';
import { ResponseMessage } from '../../../../models/interfaces/ResponseMessage';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-projects-list',
  imports: [
    NzTableModule,
    NzIconModule,
    NzButtonModule,
    NzModalModule,
    NzPopconfirmModule,
    NzTagModule,
    EditProjectComponent,
  ],
  providers: [DatePipe],
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.less',
})
export class ProjectsListComponent implements OnInit, OnDestroy {
  projectsData: ProjectsModel[] = [];
  private destroy$ = new Subject<void>();
  public userName$!: Observable<string>;
  usersData!: UsersNameModel[];

  isVisible = false;
  loadingProjects: { [key: string]: boolean } = {};
  selectedProject!: ProjectsModel;

  constructor(
    private projectsService: ProjectsService,
    private profilesServices: ProfilesService,
    private notification: NotificationService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.projectsService.projects$
      .pipe(takeUntil(this.destroy$))
      .subscribe((projects) => {
        this.projectsData = projects;
      });

    this.projectsService.getAllProjects().subscribe();
    this.profilesServices.getAllUsersName().subscribe((users) => {
      this.usersData = users;
    });
  }

  dateFormater(date: Date): string | null {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  deleteProject(id: number): void {
    this.loadingProjects[id] = true;
    setTimeout(() => {
      this.projectsService.deleteProject(id).subscribe({
        next: (response: ResponseMessage) => {
          this.notification.successNotification(response.message);
        },
        error: (error: HttpErrorResponse) => {
          this.loadingProjects[id] = false;
          this.notification.errorNotification(error.error);
        },
      });
    }, 500);
  }

  showModal(project: ProjectsModel): void {
    this.selectedProject = project;
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
