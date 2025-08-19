// app_admin/src/app/services/authentication.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { BROWSER_STORAGE } from '../storage';
import { TripDataService } from './trip-data.service';

// Minimal in-memory Storage mock
const mockStorage: Storage = {
  getItem: (k: string) => (mockStorage as any)[k] ?? null,
  setItem: (k: string, v: string) => ((mockStorage as any)[k] = v),
  removeItem: (k: string) => delete (mockStorage as any)[k],
  clear: () => Object.keys(mockStorage).forEach(k => delete (mockStorage as any)[k]),
  key: (i: number) => Object.keys(mockStorage)[i] ?? null,
  get length() { return Object.keys(mockStorage).length; }
} as unknown as Storage;

// Very light TripDataService stub for DI
const tripDataStub = {
  login: () => of({ token: 'fake.jwt.token' }),
  register: () => of({ token: 'fake.jwt.token' })
};

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        { provide: BROWSER_STORAGE, useValue: mockStorage },
        { provide: TripDataService, useValue: tripDataStub }
      ]
    });
    service = TestBed.inject(AuthenticationService);
    mockStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

