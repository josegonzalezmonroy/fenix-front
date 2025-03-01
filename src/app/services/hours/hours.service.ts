import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HoursModel } from '../../models/interfaces/hours/HoursModel';

@Injectable({
  providedIn: 'root',
})
export class HoursService {
  private apiUrl = 'http://localhost:3000/lancamentos_horas';
  private hoursSubject = new BehaviorSubject<HoursModel[]>([]);
  public hours$ = this.hoursSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllHours(): Observable<Array<HoursModel>> {
    return this.http
      .get<Array<HoursModel>>(this.apiUrl)
      .pipe(tap((hours) => this.hoursSubject.next(hours)));
  }

  registerHour(hour: HoursModel): Observable<HoursModel> {
    return this.http
      .post<HoursModel>(this.apiUrl, hour)
      .pipe(tap(() => this.getAllHours().subscribe()))
  }

  deleteHour(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.getAllHours().subscribe();
      })
    );
  }
}
