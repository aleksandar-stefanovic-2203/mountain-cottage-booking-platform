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

  async changePicture(event: any){
    this.message = await this.userService.changePicture(this.user, event)
  }
  
  register(): void {
    let message = this.userService.checkFields(this.user, true)

    if(message !== "Све је у реду"){
      this.message = message;
      return
    }

    this.userService.register(this.user).subscribe(data => {
      if(data == 1){
        this.message = ""
        alert("Захтев за регистрацију је послат!")
      } else {
        this.message = "Грешка при регистрацији!"
      }
    })
  }
}
