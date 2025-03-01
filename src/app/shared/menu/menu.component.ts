import {
  Component,
  EventEmitter,
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
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.less',
})
export class MenuComponent {
  isModalVisible = false;
  modalTitle = 'Usuário';
  modalContent!: TemplateRef<any>;

  @Output() closedMenu = new EventEmitter<void>();

  @ViewChild('cadastroUsuario', { static: true })
  CadastroUsuarioComponent!: TemplateRef<any>;
  @ViewChild('cadastroProjeto', { static: true })
  CadastroProjectsComponent!: TemplateRef<any>;
  @ViewChild('cadastroTask', { static: true })
  CadastroTaskComponent!: TemplateRef<any>;
  @ViewChild('cadastroHour', { static: true })
  CadastroHoursComponent!: TemplateRef<any>;

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
