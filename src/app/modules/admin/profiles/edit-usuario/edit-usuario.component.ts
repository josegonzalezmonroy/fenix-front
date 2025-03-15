import { NotificationService } from './../../../../services/notification/notification.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseMessage } from '../../../../models/interfaces/ResponseMessage';
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
export class EditUsuarioComponent implements OnInit {
  @Input() userEdit!: UsersModel;
  @Output() closeModal = new EventEmitter<void>();

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
      senha: new FormControl(this.userEdit.senha),
      perfil: new FormControl(this.userEdit.perfil, [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.profileEditForm.valid) {
      if (!this.profileEditForm.get('senha')?.value) {
        this.profileEditForm.get('senha')?.setValue(null);
      }
      this.isConfirmLoading = true;
      setTimeout(() => {
        this.profilesService
          .updateUser(this.userEdit.id, this.profileEditForm.value)
          .subscribe({
            next: (response: ResponseMessage) => {
              this.profileEditForm.reset();
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
