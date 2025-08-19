import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>Admin Dashboard</h2>
      <p>Welcome! Only logged-in users can see this.</p>
    </div>
  `
})
export class AdminComponent {}
