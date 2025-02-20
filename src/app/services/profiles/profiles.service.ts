import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { GetAllUsersResponse } from '../../models/interfaces/users/response/GetAllUsersResponse';
import { RegisterResponse } from '../../models/interfaces/users/response/RegisterResponse';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  private apiUrl = 'http://localhost:3000/usuarios';

  private usersSubject = new BehaviorSubject<GetAllUsersResponse[]>([]);
  public users$ = this.usersSubject.asObservable()

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<Array<GetAllUsersResponse>>{
    this.http
      .get<Array<GetAllUsersResponse>>(this.apiUrl)
      .subscribe(users => this.usersSubject.next(users));
      return this.users$;
  }

  registerUser(user: GetAllUsersResponse): Observable<RegisterResponse>{
    return this.http.post<GetAllUsersResponse>(this.apiUrl, user).pipe(
      tap(()=>{
        const currentUsers = this.usersSubject.getValue();
        const updatedUsers = [...currentUsers, user];
        this.usersSubject.next(updatedUsers);
      })
    )
  }
}
