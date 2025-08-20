import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';

@Injectable({ providedIn: 'root' })
export class TripDataService {
  public baseUrl = 'http://localhost:3000/api';
  private tripsUrl = `${this.baseUrl}/trips`;

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  /** ---------------- Helpers ---------------- */
  private getAuthHeaders(): HttpHeaders {
    const token = this.storage.getItem('travlr-token') ?? '';
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return new HttpHeaders(headers);
  }

  /** ---------------- Trips API ---------------- */
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripsUrl);
  }

  getTrip(tripCode: string): Observable<any> {
    return this.http.get<any>(`${this.tripsUrl}/${tripCode}`);
  }

  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.tripsUrl, formData, { headers: this.getAuthHeaders() });
  }

  updateTrip(formData: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.tripsUrl}/${formData.code}`, formData, { headers: this.getAuthHeaders() });
  }

  /** ---------------- Auth API ---------------- */
  login(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('login', user, passwd);
  }

  register(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('register', user, passwd);
  }

  private handleAuthAPICall(
    endpoint: 'login' | 'register',
    user: User,
    passwd: string
  ): Observable<AuthResponse> {
    let body: any;
    if (endpoint === 'login') {
      body = { email: user.email, password: passwd };                 // EXACT KEYS
    } else {
      body = { name: user.name, email: user.email, password: passwd }; // EXACT KEYS
    }
    return this.http.post<AuthResponse>(`${this.baseUrl}/${endpoint}`, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}

