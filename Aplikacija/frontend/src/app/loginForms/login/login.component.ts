import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Input('userType') userType: string = "корисник";

  username: string = ""
  password: string = ""
  type: string = "туриста"
  message: string = ""

  private userService = inject(UserService)
  private router = inject(Router)

  login(): void{
    if(this.username == ""){
      this.message = "Поље за корисничко име је празно!"
      return
    } 
    if(this.password == ""){
      this.message = "Поље за лозинку је празно!"
      return
    }
    else {      
      let newType = this.userType == "администратор" ? "администратор" : this.type
      this.userService.login(this.username, this.password, newType).subscribe(data => {
        if(data){
          this.message = ""
          localStorage.setItem("loggedUser", data.username)

          if(this.userType == 'администратор'){
            this.router.navigate([`/admin/profile/${data.username}`])
          } else if(data.type == 'туриста') {
            this.router.navigate([`/tourist/profile/${data.username}`])
          } else if(data.type == 'власник'){
            this.router.navigate([`/owner/profile/${data.username}`])
          }
        } else {
          this.message = this.userType == 'корисник'? "Погрешно корисничко име, лозинка или тип корисника!" : "Погрешно корисничко име или лозинка!"
        }
      })
    }
  }
}
