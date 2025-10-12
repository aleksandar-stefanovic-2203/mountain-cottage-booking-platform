import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: User = new User()
  message: string = ""

  private userService = inject(UserService)

  changePicture(event: any){
    let picture = event.target.files[0]
    if(!picture) return
    this.userService.checkImage(picture).then(value => {
      if(value) {
        this.user.profilePicture = picture
        this.message = ""
      }
      else {
        event.target.value = ""
        this.message = "Слика није одговарајућих димензија или није у одговарајућем формату!"
      }
    }).catch(err => {
      event.target.value = ""
      this.message = "Дошло је до грешке при учитавању слике!"
    })
  }
  
  register(): void {
    const fields: (keyof User)[] = ['username', 'password', 'firstName', 'lastName', 'address', 'phoneNumber', 'email', 'creditCardNumber'];
    for(let field of fields){
      if(this.user[field] === "") {
        this.message = "Нису сва поља попуњена!"
        return
      }
    }
    
    if(!this.userService.checkPassword(this.user.password)){
      this.message = "Лозинка није у одговарајућем формату!"
      return
    }

    if(!this.userService.checkCreditCardNumber(this.user.creditCardNumber)){
      this.message = "Број кредитне картице није у одговарајућем формату!"
      return
    }

    this.userService.register(this.user).subscribe(data => {
      if(data == 1){
        alert("Захтев за регистрацију је послат!")
      } else {
        this.message = "Грешка при регистрацији!"
      }
    })
  }
}
