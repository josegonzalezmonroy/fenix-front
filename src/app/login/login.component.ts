import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule, 
    NzButtonModule, 
    NzCheckboxModule, 
    NzFormModule, 
    NzInputModule,
    NzLayoutModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent {
  formulario = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
    senha: new FormControl('', [Validators.required])    
  })

  onSubmit(): void{
    if (this.formulario.valid) {
      console.log('FORMULARIO >>>>', this.formulario.value)
      this.formulario.reset()
    }

  }
}
