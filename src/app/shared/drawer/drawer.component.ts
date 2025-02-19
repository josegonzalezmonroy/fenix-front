import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-drawer',
  imports: [NzButtonModule, NzDrawerModule],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.less'
})
export class DrawerComponent {
  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
