import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UsersNameModel } from '../../../../models/interfaces/users/response/UsersNameModel';
import { ProjectsService } from '../../../../services/projects/projects.service';
import { ProfilesService } from '../../../../services/profiles/profiles.service';
import { NotificationService } from '../../../../services/notification/notification.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectsNameModel } from '../../../../models/interfaces/projects/response/ProjectsNameModel';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { TasksService } from '../../../../services/tasks/tasks.service';
import { TasksModel } from '../../../../models/interfaces/tasks/TasksModel';

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
  ],  templateUrl: './cadastro-task.component.html',
  styleUrl: './cadastro-task.component.less',
})
export class CadastroTaskComponent implements OnInit{
  @Output() closeModal = new EventEmitter<void>();

  isConfirmLoading = false;
  date!: Date;
  profilesName: Array<UsersNameModel> = [];
  projectsName: Array<ProjectsNameModel> = []

  constructor(
    private projectsService: ProjectsService,
    private profilesService: ProfilesService,
    private tasksService: TasksService,
    private notification: NotificationService
  ) {}

  taskForm = new FormGroup({
    id_projeto: new FormControl('', [Validators.required]),
    nome: new FormControl('', [Validators.required]),
    descricao: new FormControl('', [Validators.required]),
    data_inicio: new FormControl('', [Validators.required]),
    data_fim: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    id_usuario_responsavel: new FormControl('', [Validators.required]),
    data_criacao: new FormControl(new Date().toISOString(), [
      Validators.required,
    ]),
  })

  ngOnInit(): void {
    this.profilesService.getAllUsersName().subscribe({
      next: (users) => {
        this.profilesName = users;
      },
      error: () => {
        this.notification.errorNotification('Erro ao carregar usuarios');
      },
    });

    this.projectsService.getAllProjectsName().subscribe({
      next: projects=>{
        this.projectsName = projects
      },
      error: ()=>{
        this.notification.errorNotification('Erro ao carregar projetos')
      }
    })
  }

  onSubmit():void{
    if(this.taskForm.valid)
    {
      this.isConfirmLoading=true
      this.tasksService.registerTask(this.taskForm.value as TasksModel).subscribe({
        next:()=>{
          setTimeout(()=>{
            this.taskForm.reset()
            this.closeModal.emit()
            this.notification.successNotification('Atividade criada com sucesso')
            this.isConfirmLoading=false
          },500)
        },
        error:()=>{
          this.isConfirmLoading=false
          this.notification.errorNotification('Erro ao criar atividade')
        }
      })
    }
  }
}
