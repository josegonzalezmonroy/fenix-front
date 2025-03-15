import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HoursModel } from '../../models/interfaces/hours/HoursModel';
import { environment } from '../../../environments/environment';
import { HoursEditModel } from '../../models/interfaces/hours/HoursEditModel';
import { ResponseMessage } from '../../models/interfaces/ResponseMessage';

@Injectable({
  providedIn: 'root',
})
export class HoursService {
  private apiUrl = environment.apiUrl + '/lancamentos';
  private hoursSubject = new BehaviorSubject<HoursModel[]>([]);
  public hours$ = this.hoursSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllHours(): Observable<Array<HoursModel>> {
    return this.http
      .get<Array<HoursModel>>(this.apiUrl)
      .pipe(tap((hours) => this.hoursSubject.next(hours)));
  }

  registerHour(hour: HoursModel): Observable<ResponseMessage> {
    return this.http
      .post<ResponseMessage>(this.apiUrl, hour)
      .pipe(tap(() => this.getAllHours().subscribe()));
  }

  updateHour(id: number, hour: HoursEditModel): Observable<ResponseMessage> {
    return this.http.patch<ResponseMessage>(`${this.apiUrl}/${id}`, hour).pipe(
      tap(() => {
        this.getAllHours().subscribe();
      }),
    );
  }

  deleteHour(id: number): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.getAllHours().subscribe();
      }),
    );
  }

  getAllHoursByScopeUser(): Observable<Array<HoursModel>> {
    return this.http
      .get<Array<HoursModel>>(environment.apiUrl + '/user/lancamentos')
      .pipe(tap((hours) => this.hoursSubject.next(hours)));
  }

  registerHourScopeUser(hour: HoursModel): Observable<ResponseMessage> {
    return this.http
      .post<ResponseMessage>(`${environment.apiUrl}/user/lancamentos`, hour)
      .pipe(tap(() => this.getAllHoursByScopeUser().subscribe()));
  }

  deleteHourByScopeUser(id: number): Observable<ResponseMessage> {
    return this.http
      .delete<ResponseMessage>(`${environment.apiUrl}/user/lancamentos/${id}`)
      .pipe(
        tap(() => {
          this.getAllHoursByScopeUser().subscribe();
        }),
      );
  }
}
