import { Component, OnDestroy, OnInit } from '@angular/core';
import { HoursModel } from '../../../models/interfaces/hours/HoursModel';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { DatePipe } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { HoursService } from '../../../services/hours/hours.service';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NotificationService } from '../../../services/notification/notification.service';
import { ResponseMessage } from '../../../models/interfaces/ResponseMessage';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-hours',
  imports: [
    NzTableModule,
    NzIconModule,
    NzButtonModule,
    NzModalModule,
    NzTagModule,
    NzPopconfirmModule,
    NzTypographyModule,
  ],
  providers: [DatePipe],
  templateUrl: './hours.component.html',
  styleUrl: './hours.component.less',
})
export class HoursComponent implements OnInit, OnDestroy {
  hoursData: HoursModel[] = [];
  private destroy$ = new Subject<void>();
  loadingHours: { [key: string]: boolean } = {};

  constructor(
    private hoursService: HoursService,
    private notification: NotificationService,

    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.hoursService.hours$
      .pipe(takeUntil(this.destroy$))
      .subscribe((hours) => (this.hoursData = hours));

    this.hoursService.getAllHoursByScopeUser().subscribe();
  }

  dateFormater(date: Date): string | null {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  hourFormater(date: Date): string | null {
    return this.datePipe.transform(date, 'HH:mm');
  }

  segundosParaHHmm(dataInicioStr: string, dataFimStr: string): string {
    const dataInicio = new Date(dataInicioStr);
    const dataFim = new Date(dataFimStr);

    const diferencaEmMilissegundos = dataFim.getTime() - dataInicio.getTime();

    const segundos = Math.floor(diferencaEmMilissegundos / 1000);

    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const horasFormatadas = String(horas).padStart(2, '0');
    const minutosFormatados = String(minutos).padStart(2, '0');

    return `${horasFormatadas} horas e ${minutosFormatados} minutos`;
  }

  deleteHourByScopeUser(id: number): void {
      this.loadingHours[id] = true;
      setTimeout(() => {
        this.hoursService.deleteHourByScopeUser(id).subscribe({
          next: (response: ResponseMessage) => {
            this.notification.successNotification(response.message);
          },
          error: (error: HttpErrorResponse) => {
            this.loadingHours[id] = false;
            this.notification.errorNotification(error.error.message);
          },
        });
      }, 500);
    }

  showModal(hour: HoursModel): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
