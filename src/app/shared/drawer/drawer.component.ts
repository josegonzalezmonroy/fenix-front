import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MenuComponent } from '../menu/menu.component';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { AuthService } from '../../services/auth/auth.service';
import { NotificationService } from '../../services/notification/notification.service';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'app-drawer',
  imports: [
    NzButtonModule,
    NzIconModule,
    NzDrawerModule,
    MenuComponent,
    NzToolTipModule,
    NzTypographyModule,
  ],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.less',
})
export class DrawerComponent {
  constructor(
    private authService: AuthService,
    private notification: NotificationService,
  ) {}
  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  logout(): void {
    setTimeout(() => {
      this.authService.logout();
      this.notification.infoNotification('Sessão encerrada');
    }, 700);
  }
}
