import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ProjectsListComponent } from './projects/projects-list/projects-list.component';
import { TasksListComponent } from './tasks/tasks-list/tasks-list.component';
import { ProfilesListComponent } from './profiles/profiles-list/profiles-list.component';
import { HoursListComponent } from './hours/hours-list/hours-list.component';

export const ADMIN: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'projects', component: ProjectsListComponent },
      { path: 'profiles', component: ProfilesListComponent },
      { path: 'tasks', component: TasksListComponent },
      { path: 'hours', component: HoursListComponent },
    ],
  },
];
