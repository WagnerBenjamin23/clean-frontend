import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');
  const apiKey = environment.apiKeyBackend;

  const authReq = req.clone({
    setHeaders: {
      ...(token && { Authorization: `Bearer ${token}` }),
      'x-api-key': apiKey
    }
  });

  return next(authReq).pipe(
    tap({
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            console.warn('Token inválido o expirado, limpiando storage...');
            localStorage.clear();
            sessionStorage.clear();
            router.navigateByUrl('/login');
          }
          if (error.status === 403) {
            console.error('API_KEY inválida');
          }
        }
      }
    })
  );
};
