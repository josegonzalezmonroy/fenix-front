import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { UsersModel } from '../../models/interfaces/users/response/UsersModel';
import { RegisterResponse } from '../../models/interfaces/users/response/RegisterResponse';
import { UsersNameModel } from '../../models/interfaces/users/response/UsersNameModel';
import { environment } from '../../../environments/environment';
import { ResponseMessage } from '../../models/interfaces/ResponseMessage';

@Injectable({
  providedIn: 'root',
})
export class ProfilesService {
  private apiUrl = environment.apiUrl + '/usuarios';

  private usersSubject = new BehaviorSubject<UsersModel[]>([]);
  public users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<Array<UsersModel>> {
    return this.http
      .get<Array<UsersModel>>(this.apiUrl)
      .pipe(tap((users) => this.usersSubject.next(users)));
  }

  getAllUsersName(): Observable<Array<UsersNameModel>> {
    return this.http
      .get<Array<UsersNameModel>>(this.apiUrl)
      .pipe(map((users) => users.sort((a, b) => a.nome.localeCompare(b.nome))));
  }

  getUserById(id: number): Observable<UsersModel> {
    return this.http.get<UsersModel>(`${this.apiUrl}/${id}`);
  }

  registerUser(user: UsersModel): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(this.apiUrl, user).pipe(
      tap(() => {
        this.getAllUsers().subscribe();
      })
    );
  }

  updateUser(id: number, user: UsersModel): Observable<ResponseMessage> {
    return this.http.patch<ResponseMessage>(`${this.apiUrl}/${id}`, user).pipe(
      tap(() => {
        this.getAllUsers().subscribe();
      })
    );
  }

  deleteUser(id: number): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.getAllUsers().subscribe();
      })
    );
  }

  updateUserByScope(user: UsersModel): Observable<ResponseMessage> {
    return this.http.patch<ResponseMessage>(environment.apiUrl + '/user', user);
  }

  getProfile(): Observable<UsersModel> {
    return this.http.get<UsersModel>(environment.apiUrl+ '/user');
  }
}
