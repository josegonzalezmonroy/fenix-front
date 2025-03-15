import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'jwtToken';

  constructor(private http: HttpClient, private router: Router) {}

  private API_URL = environment.apiUrl;

  login(
    email: string,
    senha: string
  ): Observable<{ accessToken: string; expiresIn: number; nome: string } | string> {
    return this.http
      .post<{ accessToken: string; expiresIn: number; nome: string }>(
        this.API_URL + '/login',
        { email, senha }
      )
      .pipe(
        catchError((error) => {
          throw error.error || 'Erro desconhecido no login';
        })
      );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      return !this.isTokenExpired(token);
    }
    return false;
  }

  isTokenExpired(token: string): boolean {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiration = payload.exp;
    if (expiration) {
      const currentTime = Math.floor(Date.now() / 1000);
      return currentTime >= expiration;
    }
    return false;
  }

  getScope(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.scope;
    }
    return null;
  }

  getUserId(): number | null {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub; 
    }
    return null;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }
}
