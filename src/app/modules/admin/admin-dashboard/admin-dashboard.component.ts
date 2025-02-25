import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterModule } from '@angular/router';

import { ProjectListComponent } from "../../projects/project-list/project-list.component";

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    NzButtonModule,
    RouterModule,
    ProjectListComponent
],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.less',
})
export class AdminDashboardComponent {}
