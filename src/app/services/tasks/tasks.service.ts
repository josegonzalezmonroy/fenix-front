import { Injectable } from '@angular/core';
import { TasksModel } from '../../models/interfaces/tasks/TasksModel';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TasksNameModel } from '../../models/interfaces/tasks/TasksNameModel';
import { environment } from '../../../environments/environment';
import { ResponseMessage } from '../../models/interfaces/ResponseMessage';
import { TasksCreateModel } from '../../models/interfaces/tasks/TasksCreateModel';
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

  registerTask(task: TasksCreateModel): Observable<ResponseMessage> {
    return this.http
      .post<ResponseMessage>(this.apiUrl, task)
      .pipe(tap(() => this.getAllTasks().subscribe()));
  }

  updateTask(id: number, task: TasksModel): Observable<ResponseMessage> {
    return this.http.patch<ResponseMessage>(`${this.apiUrl}/${id}`, task).pipe(
      tap(() => {
        this.getAllTasks().subscribe();
      }),
    );
  }

  deleteTask(id: number): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.getAllTasks().subscribe();
      }),
    );
  }

  getTaskByProjectAndUser(
    idUsuario: number,
    idProjeto: number,
  ): Observable<Array<TasksNameModel>> {
    return this.http.get<Array<TasksNameModel>>(
      `${this.apiUrl}/projeto/${idProjeto}/usuario/${idUsuario}`,
    );
  }

  getTaskByProject(
    idProjeto: number,
  ): Observable<Array<TasksNameModel>> {
    return this.http.get<Array<TasksNameModel>>(
      `${this.apiUrl}/projeto/${idProjeto}`,
    );
  }

  getAllTasksOfScopeUsuario(): Observable<TasksModel[]> {
    return this.http
      .get<TasksModel[]>(`${environment.apiUrl}/user/atividades`)
      .pipe(
        tap((tasks) => {
          this.tasksSubject.next(tasks);
        }),
      );
  }

  getTaskByProjectScopeUsuario(
    idProjeto: number,
  ): Observable<Array<TasksNameModel>> {
    return this.http
      .get<
        TasksModel[]
      >(`${environment.apiUrl}/user/atividades/projeto/${idProjeto}`)
      .pipe(
        tap((tasks) => {
          this.tasksSubject.next(tasks);
        }),
      );
  }
}
