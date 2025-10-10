import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private http = inject(HttpClient)

  private backPath = "http://localhost:8080/users"

  login(username: string, password: string, type: string){
    const data = {
      username: username,
      password: password,
      type: type
    }
    return this.http.post<User>(`${this.backPath}/login`, data)
  }
}
