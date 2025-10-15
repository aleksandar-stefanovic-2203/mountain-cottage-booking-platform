import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';
import { of } from 'rxjs';
import { PictureWrapper } from '../models/picturewrapper';

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
    const allowedTypes = ['image/jpeg', 'image/png']; //TODO Негде сам ставио да се прихвата само jpeg, не могу да се сетим где, то треба исправити!
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

  prepareFormData(user: User): FormData{
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

    return formData
  }

  register(user: User){
    const formData = this.prepareFormData(user)
    return this.http.post<number>(`${this.backPath}/register`, formData)
  }

  fetchUser() {
    let u = localStorage.getItem("loggedUser")
    if(u){
      return this.getUser(u)
    }

    return of(new User())
  }

  getUser(username: string){
    return this.http.get<User>(`${this.backPath}/${username}`)
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

  changePassword(username: string, oldPassword: string, newPassword: string){
    return this.http.patch<number>(`${this.backPath}/changePassword/${username}`, {"oldPassword": oldPassword, "newPassword": newPassword})
  }

  async changePicture(user: User, event: any): Promise<string>{
    let picture = event.target.files[0]
    if(!picture) return "Грешка"

    try {
      const value = await this.checkImage(picture);

      if (value) {
        user.profilePicture = picture;
        return "";
      } else {
        event.target.value = "";
        return "Слика није одговарајућих димензија или није у одговарајућем формату!";
      }
    } catch (err) {
      event.target.value = "";
      return "Дошло је до грешке при учитавању слике!";
    }
  }

  updateData(user: User, newProfilePicture: boolean){
    const formData = this.prepareFormData(user)
    formData.append("newProfilePicture", newProfilePicture ? "Да" : "Не")
    return this.http.put<number>(`${this.backPath}/updateData`, formData)
  }

  checkFields(user: User, checkPassword: boolean): string{
    const fields: (keyof User)[] = ['username', 'password', 'firstName', 'lastName', 'address', 'phoneNumber', 'email', 'creditCardNumber'];
    for(let field of fields){
      if(user[field] === "") {
        return "Нису сва поља попуњена!"
      }
    }
    
    if(checkPassword && !this.checkPassword(user.password)){
      return "Лозинка није у одговарајућем формату!"
    }

    if(!this.checkCreditCardNumber(user.creditCardNumber)){
      return "Број кредитне картице није у одговарајућем формату!"
    }

    return "Све је у реду"
  }

  getAllUsers(){
    return this.http.get<User[]>(`${this.backPath}/getAllUsers`)
  }

  getAllRegistrationRequests(){
    return this.http.get<User[]>(`${this.backPath}/getAllRegistrationRequests`)
  }

  changeStatus(username: string, status: string){
    return this.http.patch<number>(`${this.backPath}/changeStatus/${username}`, status)
  }

  getPictureBytes(type: string){
    return this.http.get<PictureWrapper>(`${this.backPath}/getPictureBytes/${type}`)
  }

  loadImg(strBytes: string | null): string {
    if(strBytes){
      const bytes = this.stringToBytes(strBytes)
      return this.bytesToImage(bytes) //TODO Деалоцирање ресурса! (URL.revokeObjectURL(imgUrl))
    }

    return ""
  }
}
