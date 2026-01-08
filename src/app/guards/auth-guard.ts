import { inject, Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const token = localStorage.getItem('token');

  if (!token && state.url !== '/login') {
    router.navigate(['/login']);
    return false;
  }

  if (token && state.url === '/login') {
    router.navigate(['/admin/inicio']);
    return false;
  }

  return true;
};