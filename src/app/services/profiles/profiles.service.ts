import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UsersModel } from '../../models/interfaces/users/response/UsersModel';
import { RegisterResponse } from '../../models/interfaces/users/response/RegisterResponse';

@Injectable({
  providedIn: 'root',
})
export class ProfilesService {
  private apiUrl = 'http://localhost:3000/usuarios';

  private usersSubject = new BehaviorSubject<UsersModel[]>([]);
  public users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<Array<UsersModel>> {
    return this.http
      .get<Array<UsersModel>>(this.apiUrl)
      .pipe(tap((users) => this.usersSubject.next(users)));
  }

  registerUser(user: UsersModel): Observable<RegisterResponse> {
    return this.http.post<UsersModel>(this.apiUrl, user).pipe(
      tap((response) => {
        const currentUsers = this.usersSubject.getValue();
        const updatedUsers = [...currentUsers, response];
        this.usersSubject.next(updatedUsers);
        console.log('usuario cadastrdo', response)
      })
    );
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentUsers = this.usersSubject.getValue();
        const updatedUsers = currentUsers.filter((user) => user.id !== id);
        this.usersSubject.next(updatedUsers);
        console.log(`Usuário com ID: ${id} deletado com sucesso`);
      })
    );
  }
}
