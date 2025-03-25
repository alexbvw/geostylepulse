import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  baseUrl = environment.base_url;
  endpoint = 'api/stylist/refresh';
  private isRefreshing = false;

  constructor(private http: HttpClient, private router: Router) {}

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  private logoutAndRedirect(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['/authentication']);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const refreshToken = localStorage.getItem('refreshToken');

        if (error.status === 401 && this.isLoggedIn && refreshToken && !this.isRefreshing) {
          this.isRefreshing = true;

          return this.http.post<any>(`${this.baseUrl}${this.endpoint}`, { refreshToken }).pipe(
            switchMap((res) => {
              this.isRefreshing = false;

              const newToken = res?.token;
              if (newToken) {
                localStorage.setItem('token', newToken);
                localStorage.setItem('refreshToken', res.refreshToken);
                const clonedRequest = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${newToken}`
                  }
                });
                return next.handle(clonedRequest);
              } else {
                this.logoutAndRedirect();
                return throwError(() => new Error('No token returned from refresh.'));
              }
            }),
            catchError(err => {
              this.isRefreshing = false;
              this.logoutAndRedirect();
              return throwError(() => err);
            })
          );
        }

        if (error.status === 401) {
          this.logoutAndRedirect();
        }

        return throwError(() => error);
      })
    );
  }
}
