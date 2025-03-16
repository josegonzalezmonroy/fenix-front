import { CadastroHoursUserComponent } from './../../modules/users/hours/cadastro-hours-user/cadastro-hours-user.component';
import { EditProfileComponent } from './../../modules/users/edit-profile/edit-profile.component';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterModule } from '@angular/router';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CadastroUsuarioComponent } from '../../modules/admin/profiles/cadastro-usuario/cadastro-usuario.component';
import { CadastroProjectsComponent } from './../../modules/admin/projects/cadastro-projects/cadastro-projects.component';
import { CommonModule } from '@angular/common';
import { CadastroTaskComponent } from '../../modules/admin/tasks/cadastro-task/cadastro-task.component';
import { CadastroHoursComponent } from './../../modules/admin/hours/cadastro-hours/cadastro-hours.component';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-menu',
  imports: [
    NzMenuModule,
    NzIconModule,
    NzModalModule,
    RouterModule,
    CadastroUsuarioComponent,
    CadastroProjectsComponent,
    CommonModule,
    CadastroTaskComponent,
    CadastroHoursComponent,
    EditProfileComponent,
    CadastroHoursUserComponent,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.less',
})
export class MenuComponent implements OnInit {
  isModalVisible = false;
  modalTitle = '';
  modalContent!: TemplateRef<any>;

  @Output() closedMenu = new EventEmitter<void>();

  scope: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.scope = this.authService.getScope();
  }

  // Escopo ADMIN
  @ViewChild('cadastroUsuario', { static: true })
  CadastroUsuarioComponent!: TemplateRef<any>;
  @ViewChild('cadastroProjeto', { static: true })
  CadastroProjectsComponent!: TemplateRef<any>;
  @ViewChild('cadastroTask', { static: true })
  CadastroTaskComponent!: TemplateRef<any>;
  @ViewChild('cadastroHour', { static: true })
  CadastroHoursComponent!: TemplateRef<any>;

  // Escopo USUARIO
  @ViewChild('editProfileUser', { static: true })
  EditProfileComponent!: TemplateRef<any>;

  @ViewChild('cadastroHoursUser', { static: true })
  CadastroHoursUserComponent!: TemplateRef<any>;

  showModal(tipo: string): void {
    this.isModalVisible = true;

    switch (tipo) {
      case 'cadastroUsuario':
        this.modalTitle = 'Cadastrar Usuário';
        this.modalContent = this.CadastroUsuarioComponent;
        break;

      case 'cadastroProjeto':
        this.modalTitle = 'Cadastrar Projeto';
        this.modalContent = this.CadastroProjectsComponent;
        break;

      case 'cadastroTask':
        this.modalTitle = 'Cadastrar Atividades';
        this.modalContent = this.CadastroTaskComponent;
        break;

      case 'cadastroHour':
        this.modalTitle = 'Lançar horas';
        this.modalContent = this.CadastroHoursComponent;
        break;

      case 'editProfileUser':
        this.modalTitle = 'Editar perfil';
        this.modalContent = this.EditProfileComponent;
        break;

      case 'cadastroHoursUser':
        this.modalTitle = 'Lançar horas';
        this.modalContent = this.CadastroHoursUserComponent;
        break;
    }
  }

  closeMenu(): void {
    this.closedMenu.emit();
  }

  handleCancel(): void {
    this.isModalVisible = false;
    this.closeMenu();
  }
}
