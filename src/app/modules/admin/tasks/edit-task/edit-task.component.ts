import { ResponseMessage } from './../../../../models/interfaces/ResponseMessage';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TasksModel } from '../../../../models/interfaces/tasks/TasksModel';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ProfilesService } from '../../../../services/profiles/profiles.service';
import { NotificationService } from '../../../../services/notification/notification.service';
import { ProjectsService } from '../../../../services/projects/projects.service';
import { UsersNameModel } from '../../../../models/interfaces/users/response/UsersNameModel';
import { ProjectsNameModel } from '../../../../models/interfaces/projects/response/ProjectsNameModel';
import { TasksService } from '../../../../services/tasks/tasks.service';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-task',
  imports: [
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzAlertModule,
    NzDatePickerModule,
  ],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.less',
})
export class EditTaskComponent implements OnInit {
  @Input() taskEdit!: TasksModel;
  @Output() closeModal = new EventEmitter<void>();

  taskEditForm!: FormGroup;
  isConfirmLoading = false;
  profilesName: Array<UsersNameModel> = [];
  projectsName: Array<ProjectsNameModel> = [];

  profilesByProject = [{ id: 1, nome: 'luis' }];

  constructor(
    private profilesService: ProfilesService,
    private notification: NotificationService,
    private projectsService: ProjectsService,
    private tasksService: TasksService,
  ) {}

  ngOnInit(): void {
    this.profilesService.getAllUsersName().subscribe({
      next: (users) => (this.profilesName = users),
      error: () => {
        this.notification.errorNotification('Erro ao carregar usuarios');
      },
    });

    this.projectsService.getAllProjectsName().subscribe({
      next: (projects) => {
        this.projectsName = projects;
      },
      error: () => {
        this.notification.errorNotification('Erro ao carregar projetos');
      },
    });

    this.taskEditForm = new FormGroup({
      nome: new FormControl(this.taskEdit.nome, [Validators.required]),
      descricao: new FormControl(this.taskEdit.descricao, [
        Validators.required,
      ]),
      data_inicio: new FormControl(this.taskEdit.dataInicio, [
        Validators.required,
      ]),
      data_fim: new FormControl(this.taskEdit.dataFim, [Validators.required]),
      status: new FormControl(this.taskEdit.status, [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.taskEditForm.valid) {
      this.isConfirmLoading = true;
      setTimeout(() => {
        this.tasksService
          .updateTask(this.taskEdit.id!, this.taskEditForm.value)
          .subscribe({
            next: (response: ResponseMessage) => {
              this.taskEditForm.reset();
              this.closeModal.emit();
              this.notification.successNotification(response.message);
            },
            error: (error: HttpErrorResponse) => {
              this.isConfirmLoading = false;
              this.notification.errorNotification(error.error.message);
            },
          });
      }, 500);
    }
  }
}
