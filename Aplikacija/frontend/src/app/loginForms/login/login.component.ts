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
    if(!Utils.checkPassword(this.password)){
      this.message = this.message = "Лозинка није у одговарајућем формату!"
      return
    }
    else {
      this.message = ""
      this.userService.login(this.username, this.password, this.type).subscribe(data => {
        
      })
    }
  }
}
