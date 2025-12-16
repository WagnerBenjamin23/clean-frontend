import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');

  const authReq = req.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  });

  return next(authReq).pipe(
    tap({
      error: (error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          console.warn("TOKEN EXPIRED → redirecting...");
          router.navigateByUrl('/login');
        }
      }
    })
  );
};
