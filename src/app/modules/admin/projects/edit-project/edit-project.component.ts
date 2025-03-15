import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectsModel } from '../../../../models/interfaces/projects/response/ProjectsModel';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { ProfilesService } from '../../../../services/profiles/profiles.service';
import { NotificationService } from '../../../../services/notification/notification.service';
import { ProjectsService } from '../../../../services/projects/projects.service';
import { UsersNameModel } from '../../../../models/interfaces/users/response/UsersNameModel';
import { ResponseMessage } from '../../../../models/interfaces/ResponseMessage';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-project',
  imports: [
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzAlertModule,
    NzDatePickerModule,
  ],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.less',
})
export class EditProjectComponent implements OnInit {
  @Input() projectEdit!: ProjectsModel;
  @Output() closeModal = new EventEmitter<void>();

  projectEditForm!: FormGroup;
  isConfirmLoading = false;
  profilesName: Array<UsersNameModel> = [];

  constructor(
    private profilesService: ProfilesService,
    private notification: NotificationService,
    private projectsService: ProjectsService,
  ) {}

  ngOnInit(): void {
    this.profilesService.getAllUsersName().subscribe({
      next: (users) => (this.profilesName = users),
      error: () => {
        this.notification.errorNotification('Erro ao carregar usuarios');
      },
    });

    this.projectEditForm = new FormGroup({
      nome: new FormControl<string>(this.projectEdit.nome, [
        Validators.required,
      ]),
      descricao: new FormControl<string>(this.projectEdit.descricao, [
        Validators.required,
      ]),
      data_inicio: new FormControl<Date>(this.projectEdit.dataInicio, [
        Validators.required,
      ]),
      data_fim: new FormControl<Date>(this.projectEdit.dataFim, [
        Validators.required,
      ]),
      status: new FormControl<string>(this.projectEdit.status, [
        Validators.required,
      ]),
      prioridade: new FormControl<string>(this.projectEdit.prioridade, [
        Validators.required,
      ]),
      id_usuario_responsavel: new FormControl<number>(
        this.projectEdit.usuarioResponsavel.id,
        [Validators.required],
      ),
    });
  }

  onSubmit(): void {
    if (this.projectEditForm.valid) {
      this.isConfirmLoading = true;
      setTimeout(() => {
        this.projectsService
          .updateProject(this.projectEdit.id, this.projectEditForm.value)
          .subscribe({
            next: (response: ResponseMessage) => {
              this.projectEditForm.reset();
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
