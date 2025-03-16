import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ProjectsService } from '../../../../services/projects/projects.service';
import { NotificationService } from '../../../../services/notification/notification.service';
import { ProjectsModel } from '../../../../models/interfaces/projects/response/ProjectsModel';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
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
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { presetColors } from 'ng-zorro-antd/core/color';
import { ProjectDetailsComponent } from '../project-details/project-details.component';

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
    ProjectDetailsComponent,
    NzTypographyModule,
    CommonModule
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

  readonly presetColors = presetColors;

  loadingProjects: { [key: string]: boolean } = {};
  projectSelected!: ProjectsModel;
  isModalVisible = false;
  modalTitle = '';
  modalContent!: TemplateRef<any>;

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

  projetoAtrasado(data: ProjectsModel): boolean {
    return (
      new Date(data.dataFim) < new Date() &&
      data.status !== 'CANCELADO' &&
      data.status !== 'CONCLUIDO'
    );
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
          this.notification.errorNotification(error.error.message);
        },
      });
    }, 500);
  }

  @ViewChild('editProject', { static: true })
  EditProjectComponent!: TemplateRef<any>;

  @ViewChild('projectDetails', { static: true })
  ProjectDetailsComponent!: TemplateRef<any>;

  showModal(tipo: string, project: ProjectsModel): void {
    this.projectSelected = project;
    this.isModalVisible = true;

    switch (tipo) {
      case 'projectDetails':
        this.modalTitle = this.projectSelected.nome;
        this.modalContent;
        this.modalContent = this.ProjectDetailsComponent;
        break;

      case 'editProject':
        this.modalTitle = 'Editar Projeto';
        this.modalContent = this.EditProjectComponent;
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
