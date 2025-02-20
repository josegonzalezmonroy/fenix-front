import { Routes } from '@angular/router';
import { ProjectListComponent } from '../projects/project-list/project-list.component';
import { ProjectDetailComponent } from '../projects/project-detail/project-detail.component';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ProfilesComponent } from './profiles/profiles.component';

export const ADMIN: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'projects', component: ProjectListComponent },
      { path: 'projects/:id', component: ProjectDetailComponent },
      { path: 'profiles', component: ProfilesComponent },
    ],
  },
];
