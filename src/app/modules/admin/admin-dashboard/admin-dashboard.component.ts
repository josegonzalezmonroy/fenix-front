import { Component } from '@angular/core';
import { ProjectListComponent } from "../../projects/project-list/project-list.component";

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    ProjectListComponent
],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.less',
})
export class AdminDashboardComponent {}
