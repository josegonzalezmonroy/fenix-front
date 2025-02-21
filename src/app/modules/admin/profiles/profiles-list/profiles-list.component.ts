import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfilesService } from '../../../../services/profiles/profiles.service';
import { UsersModel } from '../../../../models/interfaces/users/response/UsersModel';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Subject, takeUntil } from 'rxjs';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { EditUsuarioComponent } from '../edit-usuario/edit-usuario.component';

@Component({
  selector: 'app-profiles-list',
  imports: [NzTableModule, NzIconModule, NzModalModule, EditUsuarioComponent],
  templateUrl: './profiles-list.component.html',
  styleUrl: './profiles-list.component.less',
})
export class ProfilesListComponent implements OnInit, OnDestroy {
  profilesData: UsersModel[] = [];
  private destroy$ = new Subject<void>();

  isVisible = false;
  isConfirmLoading = false;
  selectedUser: UsersModel | any;

  constructor(private profilesService: ProfilesService) {}

  ngOnInit(): void {
    this.profilesService.users$
      .pipe(takeUntil(this.destroy$))
      .subscribe((profiles) => (this.profilesData = profiles));

    this.profilesService.getAllUsers().subscribe();
  }

  deleteUser(id: number): void {
    this.profilesService.deleteUser(id).subscribe();
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
