import { Component, inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  private userService = inject(UserService)
  private router = inject(Router)

  ngOnInit(): void {
    this.userService.fetchUser().subscribe(data => {
      this.user = data
    })
  }

  user: User = new User()

  oldPassword: string = ""
  newPassword: string = ""
  repeatedNewPassword: string = ""
  message: string = ""

  changePassword(){
    if(this.oldPassword === "" || this.newPassword === "" || this.repeatedNewPassword === ""){
      this.message = "Нису сва поља попуњена!"
      return
    }

    if(this.newPassword !== this.repeatedNewPassword){
      this.message = "Нова лозинка и поновљена нова лозинка нису исте!"
      return
    }

    if(!this.userService.checkPassword(this.newPassword)) {
      this.message = "Нова лозинка није у одговарајућем формату!"
      return
    }

    this.userService.changePassword(this.user.username, this.oldPassword, this.newPassword).subscribe(data => {
      switch (data) {
        case 0:
          this.message = "Грешка!"
          return;

        case -1:
          this.message = "Грешка: непостојећи корисник!"
          return;

        case -2:
          this.message = "Грешка: стара лозинка није добра!"
          return;

        case -3:
          this.message = "Грешка: нова лозинка не сме да буде иста као стара!"
          return;
      
        default:
          break;
      }
      localStorage.clear()
      if(this.user.type === "администратор") this.router.navigate(["/loginAdmin"])
      else this.router.navigate(["/login"])
    })
  }
}
