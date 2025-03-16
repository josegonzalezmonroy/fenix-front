import { Component, Input, OnInit } from '@angular/core';
import { TasksModel } from '../../../../models/interfaces/tasks/TasksModel';
import { presetColors } from 'ng-zorro-antd/core/color';
import { DatePipe } from '@angular/common';
import { UsersNameModel } from '../../../../models/interfaces/users/response/UsersNameModel';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { ProfilesService } from '../../../../services/profiles/profiles.service';

@Component({
  selector: 'app-tasks-details',
  imports: [NzTagModule],
  providers: [DatePipe],
  templateUrl: './tasks-details.component.html',
  styleUrl: './tasks-details.component.less',
})
export class TasksDetailsComponent implements OnInit {
  @Input() task!: TasksModel;
  usersData: UsersNameModel[] = [];

  readonly presetColors = presetColors;

  constructor(private profilesService: ProfilesService,private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.profilesService.getAllUsersByTask(this.task.id).subscribe((users) => {
      this.usersData = users;
    });
  }

  atividadeAtrasada(data: TasksModel): boolean {
    return (
      new Date(data.dataFim) < new Date() &&
      data.status !== 'PAUSADA' &&
      data.status !== 'CONCLUIDA'
    );
  }

  dateFormater(date: Date): string | null {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }
}
