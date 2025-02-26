import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { ProjectsListComponent } from './projects/projects-list/projects-list.component';

export const ADMIN: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'projects', component: ProjectsListComponent },
      { path: 'profiles', component: ProfilesComponent },
    ],
  },
];
