import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfilesService } from '../../../../services/profiles/profiles.service';
import { UsersModel } from '../../../../models/interfaces/users/response/UsersModel';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Subject, takeUntil } from 'rxjs';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { EditUsuarioComponent } from '../edit-usuario/edit-usuario.component';

import { presetColors } from 'ng-zorro-antd/core/color';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NotificationService } from '../../../../services/notification/notification.service';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
@Component({
  selector: 'app-profiles-list',
  imports: [
    NzTableModule,
    NzIconModule,
    NzButtonModule,
    NzModalModule,
    NzPopconfirmModule,
    NzTagModule,
    EditUsuarioComponent,
  ],
  templateUrl: './profiles-list.component.html',
  styleUrl: './profiles-list.component.less',
})
export class ProfilesListComponent implements OnInit, OnDestroy {
  profilesData: UsersModel[] = [];
  private destroy$ = new Subject<void>();

  readonly presetColors = presetColors;

  loadingUsers: { [key: string]: boolean } = {};
  isVisible = false;
  selectedUser!: UsersModel;

  constructor(
    private profilesService: ProfilesService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.profilesService.users$
      .pipe(takeUntil(this.destroy$))
      .subscribe((profiles) => (this.profilesData = profiles));

    this.profilesService.getAllUsers().subscribe();
  }

  deleteUser(id: number): void {
    this.loadingUsers[id] = true;
    setTimeout(() => {
    this.profilesService.deleteUser(id).subscribe({
      next: () => {
          this.notification.successNotification(
            'Usuário deletado com sucesso!'
          );
        },
        error: () => {
          this.loadingUsers[id] = false;
          this.notification.errorNotification('Erro ao deletar usuário');
        },
      });
    }, 500);
  }

  showModal(user: UsersModel): void {
    this.selectedUser = user;
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
