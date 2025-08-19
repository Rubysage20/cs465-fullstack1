// app_admin/src/app/services/trip-data.service.ts

import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';

@Injectable({ providedIn: 'root' })
export class TripDataService {
  // We are no longer only using the /trips endpoint, so keep a baseUrl
  public baseUrl = 'http://localhost:3000/api';
  private tripsUrl = `${this.baseUrl}/trips`;

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  /** ---------------- Helpers ---------------- */

  // Attach JWT when present
  private getAuthHeaders(): HttpHeaders {
    const token = this.storage.getItem('travlr-token') ?? '';
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return new HttpHeaders(headers);
  }

  /** ---------------- Trips API ---------------- */

  // GET: /api/trips
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripsUrl);
  }

  // GET: /api/trips/:tripCode
  // The backend returns an array for a single lookup in the guide,
  // so leave this typed as any to match value[0] usage in components.
  getTrip(tripCode: string): Observable<any> {
    return this.http.get<any>(`${this.tripsUrl}/${tripCode}`);
  }

  // POST: /api/trips (protected)
  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.tripsUrl, formData, {
      headers: this.getAuthHeaders()
    });
  }

  // PUT: /api/trips/:tripCode (protected)
  updateTrip(formData: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.tripsUrl}/${formData.code}`, formData, {
      headers: this.getAuthHeaders()
    });
  }

  /** ---------------- Auth API ---------------- */

  // Call to /login endpoint, returns JWT
  login(user: User, passwd: string): Observable<AuthResponse> {
    // console.log('Inside TripDataService::login');
    return this.handleAuthAPICall('login', user, passwd);
  }

  // Call to /register endpoint, creates user and returns JWT
  register(user: User, passwd: string): Observable<AuthResponse> {
    // console.log('Inside TripDataService::register');
    return this.handleAuthAPICall('register', user, passwd);
  }

  // helper method to process both login and register methods
  private handleAuthAPICall(
    endpoint: string,
    user: User,
    passwd: string
  ): Observable<AuthResponse> {
    // console.log('Inside TripDataService::handleAuthAPICall');
    const body = {
      name: user.name,
      email: user.email,
      password: passwd
    };
    return this.http.post<AuthResponse>(`${this.baseUrl}/${endpoint}`, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}

