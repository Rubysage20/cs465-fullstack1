// src/app/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public formError: string = '';
  public submitted: boolean = false;

  // Bindings used by the template
  public credentials = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  // Called by the form submit button
  public onLoginSubmit(): void {
    this.formError = '';
    this.submitted = true;

    if (!this.credentials.email || !this.credentials.password || !this.credentials.name) {
      this.formError = 'All fields are required, please try again';
      // simple way to remain on the login view
      this.router.navigateByUrl('#');
    } else {
      this.doLogin();
    }
  }

  // Performs the login and handles redirect logic
  /* private doLogin(): void {
    const newUser = {
      name: this.credentials.name,
      email: this.credentials.email
    } as User;

    console.log('LoginComponent: doLogin()');
   // console.log(this.credentials);

    // Kick off login
    this.authenticationService.login(newUser, this.credentials.password);

    // If already logged in, go home
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate(['']);
    } else {
      // Retry once after a short delay to allow async login to complete
      var timer = setTimeout(() => {
        if (this.authenticationService.isLoggedIn()) {
          this.router.navigate(['']);
        } 
      }, 3000);  
    
    }
  }*/

private doLogin(): void {
  const newUser = {
    name: this.credentials.name,
    email: this.credentials.email
  } as User;

  console.log(' Attempting login with:', newUser);

  this.authenticationService.login(newUser, this.credentials.password).subscribe({
    next: (resp) => {
      console.log('Login successful:', resp);

      if (this.authenticationService.isLoggedIn()) {
        this.router.navigate(['']);
      }
    },
    error: (err) => {
      console.error(' Login failed:', err);
      this.formError = err?.error?.message || 'Login failed, please try again.';
    }
  });
}

}


