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

  login(username: string, password: string, type: string) {
    const data = {
      username: username,
      password: password,
      type: type
    }
    return this.http.post<User>(`${this.backPath}/login`, data)
  }

  checkPassword(password: string): boolean {
    let regExpr = /^(?=.{6,10}$)(?=[A-Za-z])(?=.*[A-Z])(?=(?:.*[a-z].*){3,})(?=.*\d)(?=.*[^A-Za-z0-9]).*$/ //TODO Научити регуларне изразе!
    return regExpr.test(password)
  }

  checkCreditCardNumber(CCN: string): boolean {
    let dinersRegExpr = /^(300|301|302|303)\d{12}$|^(36|38)\d{13}$/
    let masterCardRegExpr = /^(51|52|53|54|55)\d{14}$/
    let visaRegExpr = /^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/

    return dinersRegExpr.test(CCN) || masterCardRegExpr.test(CCN) || visaRegExpr.test(CCN)
  }

  register(user: User){
    return this.http.post<number>(`${this.backPath}/register`, user)
  }
}
