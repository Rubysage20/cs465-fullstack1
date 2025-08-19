import { Injectable, Provider } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service'; // <- adjust if needed

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Exclude auth endpoints from getting a Bearer header
    // TIP: make these match your *real* API paths (absolute or relative):
    const url = request.url || '';
    const isAuthAPI =
      url.includes('/login') || url.includes('/register'); // safer than startsWith('login')

    if (this.authenticationService.isLoggedIn() && !isAuthAPI) {
      const token = this.authenticationService.getToken(); // e.g., from localStorage
      if (token) {
        const authReq = request.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
        return next.handle(authReq);
      }
    }

    return next.handle(request);
  }
}

/** Provider that registers the interceptor */
export const authInterceptProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true
};

