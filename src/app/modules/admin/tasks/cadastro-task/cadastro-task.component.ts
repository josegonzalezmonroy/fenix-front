import { ResponseMessage } from './../../../../models/interfaces/ResponseMessage';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UsersNameModel } from '../../../../models/interfaces/users/response/UsersNameModel';
import { ProjectsService } from '../../../../services/projects/projects.service';
import { ProfilesService } from '../../../../services/profiles/profiles.service';
import { NotificationService } from '../../../../services/notification/notification.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProjectsNameModel } from '../../../../models/interfaces/projects/response/ProjectsNameModel';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { TasksService } from '../../../../services/tasks/tasks.service';
import { TasksModel } from '../../../../models/interfaces/tasks/TasksModel';
import { HttpErrorResponse } from '@angular/common/http';
import { TasksCreateModel } from '../../../../models/interfaces/tasks/TasksCreateModel';

@Component({
  selector: 'app-cadastro-task',
  imports: [
    FormsModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './cadastro-task.component.html',
  styleUrl: './cadastro-task.component.less',
})
export class CadastroTaskComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();

  isConfirmLoading = false;
  projectsName: Array<ProjectsNameModel> = [];
  profilesByProject: Array<UsersNameModel> = [];

  constructor(
    private projectsService: ProjectsService,
    private profilesService: ProfilesService,
    private tasksService: TasksService,
    private notification: NotificationService,
  ) {}

  taskForm = new FormGroup({
    projeto: new FormControl<number | null>(null, [Validators.required]),
    nome: new FormControl<string>('', [Validators.required]),
    descricao: new FormControl<string>('', [Validators.required]),
    data_inicio: new FormControl<Date | null>(null, [Validators.required]),
    data_fim: new FormControl<Date | null>(null, [Validators.required]),
    status: new FormControl<string>('', [Validators.required]),
    usuarios: new FormControl<number[]>([], [Validators.required]),
  });

  ngOnInit(): void {
    this.setupProjetoChangeListener();
    this.projectsService.getAllProjectsName().subscribe({
      next: (projects) => {
        this.projectsName = projects;
      },
      error: () => {
        this.notification.errorNotification('Erro ao carregar projetos');
      },
    });
  }

  // Escuchar cambios en el campo 'projeto'
  setupProjetoChangeListener(): void {
    this.taskForm.get('projeto')?.valueChanges.subscribe((projectId) => {
      if (projectId) {
        this.taskForm.patchValue({
          usuarios: [],
        });
        this.loadUsersByProjectId(projectId);
      } else {
        this.profilesByProject = []; // Limpiar la lista si no hay proyecto seleccionado
      }
    });
  }

  // Cargar usuarios asociados al proyecto seleccionado
  loadUsersByProjectId(projectId: number): void {
    this.projectsService.getUsersByProjectId(projectId).subscribe({
      next: (users) => {
        this.profilesByProject = users;
      },
      error: () => {
        this.notification.errorNotification(
          'Erro ao carregar usuarios do projeto',
        );
      },
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.isConfirmLoading = true;
      this.tasksService
        .registerTask(this.taskForm.value as TasksCreateModel)
        .subscribe({
          next: (response: ResponseMessage) => {
            setTimeout(() => {
              this.taskForm.reset();
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
}
