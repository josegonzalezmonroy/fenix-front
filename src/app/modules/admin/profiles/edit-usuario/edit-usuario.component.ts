import { NotificationService } from './../../../../services/notification/notification.service';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { UsersModel } from '../../../../models/interfaces/users/response/UsersModel';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzAlertModule } from 'ng-zorro-antd/alert';

import { ProfilesService } from '../../../../services/profiles/profiles.service';
@Component({
  selector: 'app-edit-usuario',
  imports: [
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzAlertModule,
  ],
  templateUrl: './edit-usuario.component.html',
  styleUrl: './edit-usuario.component.less',
})
export class EditUsuarioComponent {
  @Input() userEdit!: UsersModel;
  @Output() closeModal = new EventEmitter<void>();

  @ViewChild('alertNotification', { static: false })
  alertNotification!: TemplateRef<any>;

  profileEditForm!: FormGroup;
  isConfirmLoading = false;

  constructor(
    private profilesService: ProfilesService,
    private notification: NotificationService
  ) {}

  ngOnInit() {
    this.profileEditForm = new FormGroup({
      nome: new FormControl(this.userEdit.nome, [Validators.required]),
      email: new FormControl(this.userEdit.email, [
        Validators.required,
        Validators.email,
      ]),
      senha: new FormControl(this.userEdit.senha, [Validators.required]),
      perfil: new FormControl(this.userEdit.perfil, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.profileEditForm.valid) {
      this.profilesService
        .updateUser(this.userEdit.id, this.profileEditForm.value)
        .subscribe({
          next: () => {
            this.isConfirmLoading = true;
            setTimeout(() => {
              this.profileEditForm.reset();
              this.closeModal.emit();
              this.notification.successNotification(
                'Usuário atualizado com sucesso'
              );
            }, 700);
          },
          error: () => {
            this.notification.errorNotification(
              'Erro ao atualizar usuário, tente novamente'
            );
          },
        });
    }
  }
}
