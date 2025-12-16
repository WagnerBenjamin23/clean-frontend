import { inject, Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const token = localStorage.getItem('token');

  // Si NO hay token y NO estás en login
  if (!token && state.url !== '/login') {
    router.navigate(['/login']);
    return false;
  }

  // Si hay token y querés ir al login, redirigí al dashboard
  if (token && state.url === '/login') {
    router.navigate(['/admin/inicio']);
    return false;
  }

  return true;
};