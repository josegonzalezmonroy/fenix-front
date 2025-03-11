import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification/notification.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
    NzInputModule,
    NzLayoutModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less',
})
export class LoginComponent {
  isConfirmLoading = false;

  formulario = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur',
    }),
    senha: new FormControl('', [Validators.required]),
  });

  constructor(
    private notification: NotificationService,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.formulario.valid) {
      this.isConfirmLoading = true;

      const { email, senha } = this.formulario.value;

      if (email && senha) {
        this.authService.login(email, senha).subscribe({
          next: (response) => {
            if (typeof response === 'object') {
              const token = response.accessToken;
              localStorage.setItem('jwtToken', token);
              const nome = response.nome;

              const scope = this.authService.getScope();
              console.log('scope', scope);

              if (scope === 'ADMIN') {
                this.router.navigate(['/admin']);
              } else if (scope === 'USUARIO') {
                this.router.navigate(['/user']);
              }
              setTimeout(() => {
                this.isConfirmLoading = false;
                this.notification.successNotification(
                  `Seja bem-vindo, ${nome}!`
                );
                this.formulario.reset();
              },500) 
            }
          },
          error: (error) => {
            this.isConfirmLoading = false;
            this.notification.errorNotification(error);
          },
        });
      }
    }
  }
}
