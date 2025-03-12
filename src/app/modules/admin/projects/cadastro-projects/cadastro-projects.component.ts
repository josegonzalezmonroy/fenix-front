import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { ProjectsService } from '../../../../services/projects/projects.service';
import { NotificationService } from '../../../../services/notification/notification.service';
import { ProjectsModel } from '../../../../models/interfaces/projects/response/ProjectsModel';
import { ProfilesService } from '../../../../services/profiles/profiles.service';
import { UsersNameModel } from '../../../../models/interfaces/users/response/UsersNameModel';

@Component({
  selector: 'app-cadastro-projects',
  imports: [
    FormsModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './cadastro-projects.component.html',
  styleUrl: './cadastro-projects.component.less',
})
export class CadastroProjectsComponent implements OnInit{

  @Output() closeModal = new EventEmitter<void>();
  
  isConfirmLoading = false;
  date!: Date;
  profilesName: Array<UsersNameModel> = [];

  constructor(
    private projectsService: ProjectsService,
    private profilesService: ProfilesService,
    private notification: NotificationService
  ) {
  }

  projectForm = new FormGroup({
    nome: new FormControl<string>('', [Validators.required]),
    descricao: new FormControl<string>('', [Validators.required]),
    data_inicio: new FormControl<Date|null>(null, [Validators.required]),
    data_fim: new FormControl<Date|null>(null, [Validators.required]),
    status: new FormControl<string>('', [Validators.required]),
    id_usuario_responsavel: new FormControl<number|null>(null, [Validators.required]),
    data_criacao: new FormControl<Date>(new Date(), [
      Validators.required,
    ]),
    prioridade: new FormControl<string>('', [Validators.required]),
  });


  ngOnInit(): void {
    this.profilesService.getAllUsersName().subscribe({
      next: (users) => {
        this.profilesName = users;
      },
      error: () => {
        this.notification.errorNotification('Erro ao carregar usuarios');
      },
    });
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      this.isConfirmLoading = true;
      this.projectsService
        .registerProject(this.projectForm.value as ProjectsModel)
        .subscribe({
          next: () => {
            setTimeout(() => {
              this.projectForm.reset();
              this.closeModal.emit();
              this.notification.successNotification(
                'Projeto criado com sucesso'
              );
              this.isConfirmLoading = false;
            }, 500);
          },
          error: () => {
            this.isConfirmLoading = false;
            this.notification.errorNotification('Erro ao criar projeto');
          },
        });
    }
  }
}
