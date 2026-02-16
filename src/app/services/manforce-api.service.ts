import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManforceApiService {
  private baseUrl = 'https://jnm-manforce-demo.onrender.com';

  constructor(private http: HttpClient) {}

  // 🔐 Login API
  login(username: string, password: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    return this.http.post(`${this.baseUrl}/login`, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }

  // 👷 Get All Employees (with optional filters)
  getEmployees(filters?: { sector?: string; trade?: string; designation?: string }): Observable<any[]> {
    let params = new HttpParams();
    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key as keyof typeof filters]) {
          params = params.set(key, filters[key as keyof typeof filters]!);
        }
      });
    }
    return this.http.get<any[]>(`${this.baseUrl}/employees`, { params });
  }

  // 👤 Get Employee by ID
  getEmployeeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/employees/${id}`);
  }

  // 📊 Get Stats
  getStats(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/stats`);
  }
}
