import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { Utils } from '../../utils';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Input('userType') userType: string = "К";

  getUserTypeName(): string{
    switch (this.userType) {
      case 'К':
        return "корисник"
    
      case 'А':
        return "администратор"  

      default:
        return ""
    }
  }

  username: string = ""
  password: string = ""
  type: string = "Т"
  message: string = ""

  private userService = inject(UserService)

  login(): void{
    if(this.username == ""){
      this.message = this.message = "Поље за корисничко име је празно!"
      return
    } 
    if(this.password == ""){
      this.message = this.message = "Поље за лозинку је празно!"
      return
    }
    else {
      this.message = ""
      let newType = this.userType == "А" ? "А" : this.type
      this.userService.login(this.username, this.password, newType).subscribe(data => {
        alert(JSON.stringify(data))
      })
    }
  }
}
