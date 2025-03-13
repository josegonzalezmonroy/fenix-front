import { ResponseMessage } from './../../../../models/interfaces/ResponseMessage';
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
import { HttpErrorResponse } from '@angular/common/http';

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
    nome: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    senha: new FormControl<string>('', [Validators.required])
  });

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.isConfirmLoading = true;

      this.profilesService
        .registerUser(this.profileForm.value as UsersModel)
        .subscribe({
          next: (response: ResponseMessage) => {
            setTimeout(() => {
              this.profileForm.reset();
              this.closeModal.emit();
              this.notification.successNotification(
                response.message
              );
              this.isConfirmLoading = false;
              console.log(response)
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
