import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ProjectsService } from '../../../services/projects/projects.service';
import { GetAllProjectsResponse } from '../../../models/interfaces/projects/response/GetAllProjectsResponse';


@Component({
  selector: 'app-project-list',
  imports: [
    NzTableModule, 
    NzButtonModule, 
    RouterLink,
  ],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.less']
})

export class ProjectListComponent implements OnInit{

  projectsData: GetAllProjectsResponse[] = []

  constructor(private projectService: ProjectsService) { }

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe(projects => this.projectsData = projects)
  }
}
