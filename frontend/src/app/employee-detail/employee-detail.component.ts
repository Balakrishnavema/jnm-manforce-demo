import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-employee-detail',
  template: `
  <div style="position:fixed;left:20%;top:10%;width:60%;background:white;padding:20px;border-radius:10px;box-shadow:0 5px 20px rgba(0,0,0,0.3);">
    <h3>{{employee.name}}</h3>
    <p><b>Sector:</b> {{employee.sector}}</p>
    <p><b>Trade:</b> {{employee.trade}}</p>
    <p><b>Designation:</b> {{employee.designation}}</p>
    <p><b>Education:</b> {{employee.education}}</p>
    <p><b>Status:</b> {{employee.status}}</p>
    <p><b>Phone:</b> {{employee.phone}}</p>
    <p><b>Email:</b> {{employee.email}}</p>
    <div style="text-align:right;"><button (click)="close.emit()">Close</button></div>
  </div>`
})
export class EmployeeDetailComponent {
  @Input() employee:any;
  @Output() close = new EventEmitter<void>();
}
