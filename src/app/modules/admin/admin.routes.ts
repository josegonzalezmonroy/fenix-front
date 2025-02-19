import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { InfoComponent } from './admin-dashboard/info/info.component';
import { ProjectListComponent } from '../projects/project-list/project-list.component';
import { ProjectDetailComponent } from '../projects/project-detail/project-detail.component';

export const ADMIN: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      { path: 'projects', component: ProjectListComponent },
      { path: 'projects/:id', component: ProjectDetailComponent },
      { path: 'info', component: InfoComponent },
    ],
  },
];
