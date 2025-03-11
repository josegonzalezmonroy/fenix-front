import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigate(['/login']); 
    return false;
  }

  const scope = authService.getScope(); 
  const requestedRoute = route.routeConfig?.path; 

  if (requestedRoute === 'admin' && scope !== 'ADMIN') {
    router.navigate(['/user']); 
    return false;
  }

  if (requestedRoute === 'user' && scope !== 'USUARIO') {
    router.navigate(['/admin']); 
    return false;
  }

  return true; 
};