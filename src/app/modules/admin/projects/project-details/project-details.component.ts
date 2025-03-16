import { Component, Input, OnInit } from '@angular/core';
import { ProjectsModel } from '../../../../models/interfaces/projects/response/ProjectsModel';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { presetColors } from 'ng-zorro-antd/core/color';
import { DatePipe } from '@angular/common';
import { UsersNameModel } from '../../../../models/interfaces/users/response/UsersNameModel';
import { ProjectsService } from '../../../../services/projects/projects.service';
import { TasksService } from '../../../../services/tasks/tasks.service';
import { TasksNameModel } from '../../../../models/interfaces/tasks/TasksNameModel';

@Component({
  selector: 'app-project-details',
  imports: [
    NzTagModule
  ],
  providers: [DatePipe],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.less',
})
export class ProjectDetailsComponent implements OnInit {
  @Input() project!: ProjectsModel;
  usersData: UsersNameModel[] = [];
  tasksData: TasksNameModel[] = [];

  readonly presetColors = presetColors;

  constructor(
    private projectsService: ProjectsService,
    private tasksService: TasksService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.projectsService
      .getUsersByProjectId(this.project.id)
      .subscribe((users) => {
        this.usersData = users;
      });
    this.tasksService.getTaskByProject(this.project.id).subscribe((tasks) => {
      this.tasksData = tasks;
    });
  }

  projetoAtrasado(data: ProjectsModel): boolean {
    return (
      new Date(data.dataFim) < new Date() &&
      data.status !== 'CANCELADO' &&
      data.status !== 'CONCLUIDO'
    );
  }
  dateFormater(date: Date): string | null {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }
}
