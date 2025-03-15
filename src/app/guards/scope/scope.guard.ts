import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const scopeGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const scope = authService.getScope();

  if (scope === 'ADMIN') {
    router.navigate(['/admin']);
    return false;
  } else if (scope === 'USUARIO') {
    router.navigate(['/user']);
    return false;
  }
  return true;
};
