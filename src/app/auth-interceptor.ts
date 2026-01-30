import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  const authReq = req.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : '',
      'x-api-key': environment.apiKey
    }
  });

  return next(authReq).pipe(
    tap({
      error: (error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          router.navigateByUrl('/login');
        }
      }
    })
  );
};
