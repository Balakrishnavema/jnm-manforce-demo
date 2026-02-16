import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  base = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getEmployees(sector?:string, trade?:string, designation?:string){
    let params:any = {};
    if(sector) params.sector=sector;
    if(trade) params.trade=trade;
    if(designation) params.designation=designation;
    return this.http.get<any[]>(this.base + '/employees', { params });
  }
  getStats(){ return this.http.get<any>(this.base + '/stats'); }
}
