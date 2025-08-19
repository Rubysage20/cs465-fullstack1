// app_admin/src/app/services/authentication.service.ts
import { Injectable, Inject } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripDataService } from '../services/trip-data.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  // keep the last auth response if you want to read it later
  private authResp: AuthResponse | null = null;

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) {}

  /** ----- Token helpers ----- */

  // Read JWT from storage (returns '' if missing for safer comparisons)
  public getToken(): string {
    const token = this.storage.getItem('travlr-token');
    return token ? token : '';
  }

  // Save JWT to storage
  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  // Clear JWT from storage
  public logout(): void {
    this.storage.removeItem('travlr-token');
    this.authResp = null;
  }

  /** ----- Session helpers ----- */

  // True if a token exists AND its exp time is still in the future
  public isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      // bad/garbled token
      return false;
    }
  }

  // Returns current user info decoded from the token
  // Call this only after checking isLoggedIn()
  public getCurrentUser(): User | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const { email, name } = payload;
      return { email, name } as User;
    } catch {
      return null;
    }
  }

  /** ----- Auth actions (return Observables) ----- */

  // Login: returns an Observable so the caller can subscribe
  public login(user: User, passwd: string): Observable<AuthResponse> {
    return this.tripDataService.login(user, passwd).pipe(
      tap((resp: AuthResponse) => {
        this.authResp = resp;
        if (resp?.token) this.saveToken(resp.token);
      }),
      catchError((err) => {
        console.error('Login error:', err);
        return throwError(() => err);
      })
    );
  }

  // Register: mirrors login behavior (API typically issues a token on success)
  public register(user: User, passwd: string): Observable<AuthResponse> {
    return this.tripDataService.register(user, passwd).pipe(
      tap((resp: AuthResponse) => {
        this.authResp = resp;
        if (resp?.token) this.saveToken(resp.token);
      }),
      catchError((err) => {
        console.error('Register error:', err);
        return throwError(() => err);
      })
    );
  }
}
