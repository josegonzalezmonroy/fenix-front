import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { DrawerComponent } from '../../shared/drawer/drawer.component';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, DrawerComponent, NzLayoutModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.less',
})
export class AdminComponent {}
