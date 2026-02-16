import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  template: `
  <div style="padding:20px;">
    <h2>Dashboard</h2>
    <div style="display:flex;gap:20px;margin-top:20px;">
      <div *ngFor="let c of cards" style="border:1px solid #ddd;padding:15px;border-radius:8px;width:150px;text-align:center;">
        <div>{{c.label}}</div>
        <h3>{{c.value}}</h3>
      </div>
    </div>
    <div style="margin-top:20px;">
      <a routerLink="/employees">View Employees</a>
    </div>
  </div>`
})
export class DashboardComponent implements OnInit {
  cards: any[] = [];
  constructor(private api: ApiService) {}
  ngOnInit(): void {
    this.api.getStats().subscribe(s => {
      this.cards = [
        { label: 'Total', value: s.total },
        { label: 'Available', value: s.available },
        { label: 'Deployed', value: s.deployed }
      ];
    });
  }
}
