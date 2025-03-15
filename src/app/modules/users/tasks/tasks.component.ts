import { Component, OnDestroy, OnInit } from '@angular/core';
import { TasksModel } from '../../../models/interfaces/tasks/TasksModel';
import { Subject, takeUntil } from 'rxjs';
import { TasksService } from '../../../services/tasks/tasks.service';
import { presetColors } from 'ng-zorro-antd/core/color';
import { DatePipe } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'app-tasks',
  imports: [
    NzTableModule,
    NzIconModule,
    NzButtonModule,
    NzModalModule,
    NzTagModule,
    NzTypographyModule,
  ],
  providers: [DatePipe],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.less',
})
export class TasksComponent implements OnInit, OnDestroy {
  tasksData: TasksModel[] = [];
  private destroy$ = new Subject<void>();

  readonly presetColors = presetColors;

  constructor(
    private tasksService: TasksService,
    private datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.tasksService.tasks$
      .pipe(takeUntil(this.destroy$))
      .subscribe((tasks) => (this.tasksData = tasks));

    this.tasksService.getAllTasksOfScopeUsuario().subscribe();
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

  showModal(task: TasksModel): void {}

  handleCancel(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
