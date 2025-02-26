import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-admin-dashboard',
  imports: [
    NzButtonModule,
    RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.less',
})
export class AdminDashboardComponent {}
