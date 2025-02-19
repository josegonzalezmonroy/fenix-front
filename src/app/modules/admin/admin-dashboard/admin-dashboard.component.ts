import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { DrawerComponent } from '../../../shared/drawer/drawer.component';

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    RouterOutlet, 
    NzLayoutModule,
    DrawerComponent
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.less',
})
export class AdminDashboardComponent {}
