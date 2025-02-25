import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ProjectsModel } from '../../models/interfaces/projects/response/ProjectsModel';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private apiUrl = 'http://localhost:3000/projetos';
  private projectsSubject = new BehaviorSubject<ProjectsModel[]>([]);
  public projects$ = this.projectsSubject.asObservable();

  constructor(private http: HttpClient) { }

  getAllProjects(): Observable<Array<ProjectsModel>> { 
    return this.http.get<Array<ProjectsModel>>(this.apiUrl)
    .pipe(tap((projects) => this.projectsSubject.next(projects)));
  }

  registerProject(project: ProjectsModel): Observable<ProjectsModel> {
    return this.http.post<ProjectsModel>(this.apiUrl, project).pipe(
      tap(() => {
        this.getAllProjects().subscribe();
      })
    );
  }

}
