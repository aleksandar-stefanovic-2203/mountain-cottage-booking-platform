import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user';

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
  register(): void {
    if(this.user.username == "" || this.user.password == "" || this.user.firstName == "" || this.user.lastName == "" || 
       this.user.address == "" || this.user.phoneNumber == "" || this.user.email == "" || this.user.creditCardNumber == ""
    ) {
      this.message = "Нису сва поља попуњена!"
    } else { //TODO Проверити формат лозинке и броја кредитне картице
      this.message = ""
    }
  }
}
