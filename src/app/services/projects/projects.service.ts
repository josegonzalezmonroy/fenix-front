import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { ProjectsModel } from '../../models/interfaces/projects/response/ProjectsModel';
import { ProjectsNameModel } from '../../models/interfaces/projects/response/ProjectsNameModel';
import { environment } from '../../../environments/environment';
import { ResponseMessage } from '../../models/interfaces/ResponseMessage';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private apiUrl = environment.apiUrl + '/projetos';
  private projectsSubject = new BehaviorSubject<ProjectsModel[]>([]);
  public projects$ = this.projectsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<Array<ProjectsModel>> {
    return this.http
      .get<Array<ProjectsModel>>(this.apiUrl)
      .pipe(tap((projects) => {
        this.projectsSubject.next(projects)}));
  }

  getAllProjectsName(): Observable<Array<ProjectsNameModel>> {
    return this.http
      .get<Array<ProjectsNameModel>>(this.apiUrl)
      .pipe(
        map((projects) => projects.sort((a, b) => a.nome.localeCompare(b.nome)))
      );
  }

  registerProject(project: ProjectsModel): Observable<ProjectsModel> {
    return this.http.post<ProjectsModel>(this.apiUrl, project).pipe(
      tap(() => {
        this.getAllProjects().subscribe();
      })
    );
  }

  updateProject(id: number, project: ProjectsModel): Observable<ResponseMessage> {
    return this.http.patch<ResponseMessage>(`${this.apiUrl}/${id}`, project).pipe(
      tap(() => {
        this.getAllProjects().subscribe();
      })
    );
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.getAllProjects().subscribe();
      })
    );
  }
}
