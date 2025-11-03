import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly EMAIL_KEY = 'user_email';

  constructor(private router: Router) {}

  login(email: string) {
    localStorage.setItem(this.TOKEN_KEY, 'mock-token');
    localStorage.setItem(this.EMAIL_KEY, email);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.EMAIL_KEY);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getUserEmail(): string | null {
    return localStorage.getItem(this.EMAIL_KEY);
  }
}
