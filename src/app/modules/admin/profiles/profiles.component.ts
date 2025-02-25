import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CadastroUsuarioComponent } from "./cadastro-usuario/cadastro-usuario.component";
import { ProfilesListComponent } from "./profiles-list/profiles-list.component";

@Component({
  selector: 'app-profiles',
  imports: [
    NzButtonModule,
    NzModalModule,
    ProfilesListComponent
],
  templateUrl: './profiles.component.html',
  styleUrl: './profiles.component.less'
})
export class ProfilesComponent {
  isVisible = false;
  isConfirmLoading = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
