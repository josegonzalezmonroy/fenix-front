import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { DrawerComponent } from '../../shared/drawer/drawer.component';

@Component({
  selector: 'app-users',
  imports: [RouterOutlet, DrawerComponent, NzLayoutModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.less',
})
export class UsersComponent {}
