import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsersModel } from '../../../models/interfaces/users/response/UsersModel';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProfilesService } from '../../../services/profiles/profiles.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { ResponseMessage } from '../../../models/interfaces/ResponseMessage';
import { HttpErrorResponse } from '@angular/common/http';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzAlertModule } from 'ng-zorro-antd/alert';

@Component({
  selector: 'app-edit-profile',
  imports: [
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzAlertModule,
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.less',
})
export class EditProfileComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();

  userEdit!: UsersModel;
  email = '';
  profileEditForm!: FormGroup;
  isConfirmLoading = false;
  constructor(
    private profilesService: ProfilesService,
    private notification: NotificationService,
  ) {}

  ngOnInit() {
    this.profileEditForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      senha: new FormControl(''),
    });

    this.profilesService.getProfile().subscribe((profile) => {
      this.userEdit = profile;
      this.email = profile.email;
      this.profileEditForm.patchValue({
        nome: profile.nome,
        senha: profile.senha,
      });
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
          .updateUserByScope(this.profileEditForm.value)
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
