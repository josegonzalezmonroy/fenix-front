import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterModule } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ProjectsService } from '../../../services/projects/projects.service';
import { ProfilesService } from '../../../services/profiles/profiles.service';
import { TasksService } from '../../../services/tasks/tasks.service';
import { HoursService } from '../../../services/hours/hours.service';
import { HoursModel } from '../../../models/interfaces/hours/HoursModel';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    NzButtonModule,
    RouterModule,
    NzButtonModule,
    NzGridModule,
    NzStatisticModule,
    NzTypographyModule,
    NzDividerModule,
    NzCardModule,
    NzIconModule,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.less',
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  totalProjetos = 0;
  totalProjetosPlanejados = 0;
  totalProjetosEmAndamento = 0;
  totalProjetosConcluidos = 0;
  totalProjetosCancelados = 0;

  totalUsuarios = 0;
  totalAdmin = 0;
  totalUsers = 0;

  totalAtividades = 0;
  totalAtividadesAbertas = 0;
  totalAtividadesEmAndamento = 0;
  totalAtividadesPausadas = 0;
  totalAtividadesConcluidas = 0;

  totalLancamentos = 0;
  totalHoras = 0;

  constructor(
    private projectsService: ProjectsService,
    private profilesService: ProfilesService,
    private tasksService: TasksService,
    private hoursService: HoursService
  ) {}

  ngOnInit(): void {
    this.projectsService.getAllProjects().subscribe();

    this.projectsService.projects$
      .pipe(takeUntil(this.destroy$))
      .subscribe((projects) => {
        this.totalProjetos = projects.length;

        this.totalProjetosPlanejados = projects.filter(
          (project) => project.status === 'PLANEJADO'
        ).length;

        this.totalProjetosEmAndamento = projects.filter(
          (project) => project.status === 'EM_ANDAMENTO'
        ).length;

        this.totalProjetosConcluidos = projects.filter(
          (project) => project.status === 'CONCLUIDO'
        ).length;

        this.totalProjetosCancelados = projects.filter(
          (project) => project.status === 'CANCELADO'
        ).length;
      });

    this.profilesService.getAllUsers().subscribe();

    this.profilesService.users$
      .pipe(takeUntil(this.destroy$))
      .subscribe((users) => {
        this.totalUsuarios = users.length;

        this.totalAdmin = users.filter(
          (user) => user.perfil === 'ADMIN'
        ).length;

        this.totalUsers = users.filter(
          (user) => user.perfil === 'USUARIO'
        ).length;
      });

    this.tasksService.getAllTasks().subscribe();

    this.tasksService.tasks$
      .pipe(takeUntil(this.destroy$))
      .subscribe((tasks) => {
        this.totalAtividades = tasks.length;

        this.totalAtividadesAbertas = tasks.filter(
          (task) => task.status === 'ABERTA'
        ).length;

        this.totalAtividadesEmAndamento = tasks.filter(
          (task) => task.status === 'EM_ANDAMENTO'
        ).length;

        this.totalAtividadesPausadas = tasks.filter(
          (task) => task.status === 'PAUSADA'
        ).length;

        this.totalAtividadesConcluidas = tasks.filter(
          (task) => task.status === 'CONCLUIDA'
        ).length;
      });

    this.hoursService.getAllHours().subscribe();

    this.hoursService.hours$
      .pipe(takeUntil(this.destroy$))
      .subscribe((hours) => {
        this.totalLancamentos = hours.length;
        this.totalHoras = this.calcularTotalHoras(hours);
      });
  }

  calcularTotalHoras(hours: HoursModel[]): number {
    let totalHoras = 0;

    hours.forEach((hour) => {
      const dataInicio = new Date(hour.dataInicio).getTime();
      const dataFim = new Date(hour.dataFim).getTime();

      const diferencaHoras = (dataFim - dataInicio) / (1000 * 60 * 60);
      totalHoras += diferencaHoras;
    });

    return Math.floor(totalHoras);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
