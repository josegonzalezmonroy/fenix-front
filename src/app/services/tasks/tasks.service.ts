import { Injectable } from '@angular/core';
import { TasksModel } from '../../models/interfaces/tasks/TasksModel';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TasksNameModel } from '../../models/interfaces/tasks/TasksNameModel';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private apiUrl = environment.apiUrl + '/atividades';
  private tasksSubject = new BehaviorSubject<TasksModel[]>([]);
  public tasks$ = this.tasksSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<Array<TasksModel>> { 
    return this.http
      .get<Array<TasksModel>>(this.apiUrl)
      .pipe(tap((tasks) => this.tasksSubject.next(tasks)));
  }

  getAllTasksName(): Observable<Array<TasksNameModel>> {
    return this.http
      .get<Array<TasksNameModel>>(this.apiUrl)
      .pipe(map((tasks) => tasks.sort((a, b) => a.nome.localeCompare(b.nome))));
  }

  registerTask(task: TasksModel): Observable<TasksModel> {
    return this.http
      .post<TasksModel>(this.apiUrl, task)
      .pipe(tap(() => this.getAllTasks().subscribe()));
  }

  updateTask(id: number, task: TasksModel): Observable<TasksModel> {
    return this.http.patch<TasksModel>(`${this.apiUrl}/${id}`, task).pipe(
      tap(() => {
        this.getAllTasks().subscribe();
      })
    );
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.getAllTasks().subscribe();
      })
    );
  }
}
