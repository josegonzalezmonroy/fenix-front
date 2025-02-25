import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterModule } from '@angular/router';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CadastroUsuarioComponent } from "../../modules/admin/profiles/cadastro-usuario/cadastro-usuario.component";
import { CadastroProjectsComponent } from './../../modules/admin/projects/cadastro-projects/cadastro-projects.component';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-menu',
  imports: [NzMenuModule, NzIconModule, NzModalModule, RouterModule, CadastroUsuarioComponent, CadastroProjectsComponent,CommonModule], 
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.less'
})
export class MenuComponent {

    isModalVisible = false;
    modalTitle = 'Usuário';
    modalContent!: TemplateRef<any>;

  @ViewChild('cadastroUsuario', { static: true }) CadastroUsuarioComponent!: TemplateRef<any>;

  @ViewChild('cadastroProjeto', { static: true }) CadastroProjectsComponent!: TemplateRef<any>;

  showModal(tipo: string):void{
    this.isModalVisible = true;

    switch(tipo){
      case 'cadastroUsuario':
        this.modalTitle = 'Cadastrar Usuário';
        this.modalContent = this.CadastroUsuarioComponent;
        break;

      case 'cadastroProjeto':
        this.modalTitle = 'Cadastrar Projeto'
        this.modalContent = this.CadastroProjectsComponent
        break;
    }
  }

  handleCancel():void{
    this.isModalVisible = false;
  }

}
