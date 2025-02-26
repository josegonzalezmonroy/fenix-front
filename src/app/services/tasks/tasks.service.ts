import { Injectable } from '@angular/core';
import { TasksModel } from '../../models/interfaces/tasks/TasksModel';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private apiUrl = 'http://localhost:3000/atividades';
  private tasksSubject = new BehaviorSubject<TasksModel[]>([]);
  public tasks$ = this.tasksSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<Array<TasksModel>> {
    return this.http
      .get<Array<TasksModel>>(this.apiUrl)
      .pipe(tap((tasks) => this.tasksSubject.next(tasks)));
  }
  
  registerTask(task: TasksModel): Observable<TasksModel> {
    return this.http
      .post<TasksModel>(this.apiUrl, task)
      .pipe(tap(() => this.getAllTasks().subscribe()));
  }
}
