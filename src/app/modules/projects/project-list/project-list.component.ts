import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { projetos } from '../../../models/interfaces/projects/response/projetosTeste';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';


@Component({
  selector: 'app-project-list',
  imports: [NzTableModule, NzButtonModule, RouterLink],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.less'
})
export class ProjectListComponent {
  listaDeProjetos = projetos
}
