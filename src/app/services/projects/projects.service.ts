import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllProjectsResponse } from '../../models/interfaces/projects/response/GetAllProjectsResponse';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private apiUrl = 'http://localhost:3000/projetos';

  constructor(private http: HttpClient) { }

  getAllProjects(): Observable<Array<GetAllProjectsResponse>> { 
    return this.http.get<Array<GetAllProjectsResponse>>(this.apiUrl);
  }
}
