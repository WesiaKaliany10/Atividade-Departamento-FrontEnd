import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/departamentos']);
    }
  }

  login() {
    if (this.email.trim()) {
      this.auth.login(this.email);
      this.router.navigate(['/departamentos']);
    }
  }
}
