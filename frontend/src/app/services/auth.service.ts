import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  tokenKey = 'jnm_token';
  login(username: string, password: string): Observable<any> {
    return new Observable(observer => {
      if (username === 'admin' && password === 'admin123') {
        localStorage.setItem(this.tokenKey, 'demo-token');
        observer.next({ token: 'demo-token' });
        observer.complete();
      } else {
        observer.error('Invalid credentials');
      }
    });
  }
  getToken() { return localStorage.getItem(this.tokenKey); }
  logout() { localStorage.removeItem(this.tokenKey); }
}
