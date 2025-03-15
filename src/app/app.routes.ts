import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { scopeGuard } from './guards/scope/scope.guard';
import { authGuard } from './guards/auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [scopeGuard] },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [authGuard],
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/users/users.module').then((m) => m.UsersModule),
    canActivate: [authGuard],
  },
];
