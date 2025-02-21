import { Component, EventEmitter, Output } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProfilesService } from '../../../../services/profiles/profiles.service';
import { UsersModel } from '../../../../models/interfaces/users/response/UsersModel'

@Component({
  selector: 'app-cadastro-usuario',
  imports: [NzFormModule, NzButtonModule, ReactiveFormsModule],
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.less',
})
export class CadastroUsuarioComponent {
  isConfirmLoading = false;

  @Output() closeModal = new EventEmitter<void>();

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

  constructor(private profilesService: ProfilesService) {}

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.profilesService
        .registerUser(this.profileForm.value as UsersModel)
        .subscribe((response) => {
          console.log(
            `ID: ${response.id}, ${response.nome} cadastrado com sucesso`
          );
          this.isConfirmLoading = true;
          setTimeout(() => {
            this.profileForm.reset();
            this.closeModal.emit();
            this.isConfirmLoading = false;
          }, 1000);
        });
    } else {
      console.log('Formulário inválido');
    }
  }
}
