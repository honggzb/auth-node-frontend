import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  var refresh = false;

  const authService = inject(AuthService);
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authService.accessToken}`
    }
  });

  return next(authReq).pipe(catchError((err: HttpErrorResponse) => {
    if(err.status === 401 && !refresh) {    // refresh token
      refresh = true;
      return authService.refresh().pipe(
        switchMap((res: any) => {
          authService.accessToken = res.token;
          return next( authReq.clone({
            setHeaders: {
              Authorization: `Bearer ${authService.accessToken}`
            }
          }))
        })
      )
    }
    refresh = false;
    return throwError(() => err)
  }));
};
