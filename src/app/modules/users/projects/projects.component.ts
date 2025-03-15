import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { ProjectsModel } from '../../../models/interfaces/projects/response/ProjectsModel';
import { DatePipe } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ProjectsService } from '../../../services/projects/projects.service';
import { presetColors } from 'ng-zorro-antd/core/color';

@Component({
  selector: 'app-projects',
  imports: [
    NzTableModule,
    NzIconModule,
    NzButtonModule,
    NzTagModule,
    NzTypographyModule,
  ],
  providers: [DatePipe],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.less',
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projectsData: ProjectsModel[] = [];
  private destroy$ = new Subject<void>();
  userId: string | null = null;

  readonly presetColors = presetColors;

  constructor(
    private projectsService: ProjectsService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.projectsService.projects$
      .pipe(takeUntil(this.destroy$))
      .subscribe((projects) => {
        this.projectsData = projects;
      });
      this.projectsService.getAllProjectsOfScopeUsuario().subscribe();
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  showModal(project: ProjectsModel):void
  {

  }
}
