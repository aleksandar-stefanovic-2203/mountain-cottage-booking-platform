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

  // TODO Искоментарисати цео пројекат!!!
  checkImage(file: File): Promise<boolean> {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if(!allowedTypes.includes(file.type)) return Promise.resolve(false);

    return new Promise((resolve) => {
      const img = new Image()
      img.src = URL.createObjectURL(file)
      img.onload = () => {
        if(img.width < 100 || img.width > 300 || img.height < 100 || img.height > 300) resolve(false)
        else resolve(true)

        URL.revokeObjectURL(img.src)
      }
      img.onerror = () => resolve(false)
    })
  }

  register(user: User){
    const formData = new FormData()

    formData.append('username', user.username);
    formData.append('password', user.password);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('gender', user.gender);
    formData.append('address', user.address);
    formData.append('phoneNumber', user.phoneNumber);
    formData.append('email', user.email);
    formData.append('creditCardNumber', user.creditCardNumber);
    formData.append('type', user.type);
    formData.append('status', user.status);

    if (user.profilePicture) {
      formData.append('profilePicture', user.profilePicture, user.profilePicture.name);
    }
    
    return this.http.post<number>(`${this.backPath}/register`, formData)
  }

  fetchUser(): User {
    let u = localStorage.getItem("loggedUser")
    if(u){
      return JSON.parse(u)
    }

    return new User()
  }

  stringToBytes(bytesString: string): number[] {
  const binaryString = atob(bytesString);
  const len = binaryString.length;
  const bytes = [];
  for (let i = 0; i < len; i++) {
    bytes.push(binaryString.charCodeAt(i));
  }
  return bytes;
}

  bytesToImage(bytes: number[], type = "image/jpeg"): string {
    const safeBytes = new Uint8Array(bytes)
    const blob = new Blob([safeBytes], {type: type})
    return URL.createObjectURL(blob)
  }
}
