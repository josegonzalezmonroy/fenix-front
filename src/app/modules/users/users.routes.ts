import { Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { ProjectsComponent } from './projects/projects.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TasksComponent } from './tasks/tasks.component';
import { HoursComponent } from './hours/hours.component';

export const USERS: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
        { path: '', component: DashboardComponent },
        { path: 'projects', component: ProjectsComponent },
        { path: 'tasks', component: TasksComponent },
        { path: 'hours', component: HoursComponent }],
  },
];
