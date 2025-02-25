import { Component, EventEmitter, Output } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProfilesService } from '../../../../services/profiles/profiles.service';
import { UsersModel } from '../../../../models/interfaces/users/response/UsersModel';
import { NotificationService } from '../../../../services/notification/notification.service';

@Component({
  selector: 'app-cadastro-usuario',
  imports: [
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.less',
})
export class CadastroUsuarioComponent {
  isConfirmLoading = false;

  @Output() closeModal = new EventEmitter<void>();

  constructor(
    private profilesService: ProfilesService,
    private notification: NotificationService
  ) {}

  profileForm = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required]),
    data_criacao: new FormControl(new Date().toISOString(), [
      Validators.required,
    ]),
    ultimo_login: new FormControl(''),
    perfil: new FormControl('USUARIO', [Validators.required]),
  });

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.isConfirmLoading = true;

      this.profilesService
        .registerUser(this.profileForm.value as UsersModel)
        .subscribe({
          next: () => {
            setTimeout(() => {
              this.profileForm.reset();
              this.closeModal.emit();
              this.notification.successNotification(
                'Usuario criado com sucesso'
              );
              this.isConfirmLoading = false;
            }, 500);
          },
          error: () => {
            this.isConfirmLoading = false;
            this.notification.errorNotification('Erro ao criar usuário');
          },
        });
    }
  }
}
