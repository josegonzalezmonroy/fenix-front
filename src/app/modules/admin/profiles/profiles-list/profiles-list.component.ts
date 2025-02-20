import { Component, OnInit } from '@angular/core';
import { ProfilesService } from '../../../../services/profiles/profiles.service';
import { GetAllUsersResponse } from '../../../../models/interfaces/users/response/GetAllUsersResponse';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-profiles-list',
  imports: [NzTableModule, NzIconModule],
  templateUrl: './profiles-list.component.html',
  styleUrl: './profiles-list.component.less',
})
export class ProfilesListComponent implements OnInit {
  profilesData: GetAllUsersResponse[] = [];

  constructor(private profilesService: ProfilesService) {}

  ngOnInit(): void {
    this.profilesService.users$.subscribe(
      (profiles) => (this.profilesData = profiles)
    );

    this.profilesService.getAllUsers().subscribe();
  }
}
