import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-employees',
  template: `
  <div style="padding:20px;">
    <h2>Employees</h2>
    <div style="margin:10px 0;">
      <input placeholder="Sector" [(ngModel)]="sector" />
      <input placeholder="Trade" [(ngModel)]="trade" />
      <input placeholder="Designation" [(ngModel)]="designation" />
      <button (click)="load()">Filter</button>
      <button (click)="reset()">Reset</button>
    </div>

    <table border="1" cellspacing="0" cellpadding="6" style="width:100%;">
      <thead><tr><th>Name</th><th>Sector</th><th>Trade</th><th>Designation</th><th>Status</th><th>Action</th></tr></thead>
      <tbody>
        <tr *ngFor="let e of employees">
          <td>{{e.name}}</td><td>{{e.sector}}</td><td>{{e.trade}}</td>
          <td>{{e.designation}}</td><td>{{e.status}}</td>
          <td><button (click)="select(e)">View</button></td>
        </tr>
      </tbody>
    </table>

    <app-employee-detail *ngIf="selected" [employee]="selected" (close)="selected=null"></app-employee-detail>
  </div>`
})
export class EmployeesComponent implements OnInit {
  employees:any[]=[]; sector=''; trade=''; designation=''; selected:any=null;
  constructor(private api:ApiService){}
  ngOnInit(){ this.load(); }
  load(){ this.api.getEmployees(this.sector,this.trade,this.designation).subscribe(d=>this.employees=d); }
  reset(){ this.sector='';this.trade='';this.designation='';this.load(); }
  select(e:any){ this.selected=e; }
}
