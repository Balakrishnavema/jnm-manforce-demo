import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  template: `
  <div style="max-width:400px;margin:80px auto;">
    <h2>JNM Manforce - Admin Login</h2>
    <form (ngSubmit)="login()">
      <input [(ngModel)]="username" name="username" placeholder="Username" class="form-control" />
      <input [(ngModel)]="password" name="password" type="password" placeholder="Password" class="form-control" style="margin-top:10px;" />
      <button type="submit" style="margin-top:15px;">Login</button>
    </form>
    <p style="margin-top:10px;color:gray;">Demo: <b>admin / admin123</b></p>
  </div>`
})
export class LoginComponent {
  username = '';
  password = '';
  constructor(private auth: AuthService, private router: Router) {}
  login() {
    this.auth.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: () => alert('Invalid credentials')
    });
  }
}
