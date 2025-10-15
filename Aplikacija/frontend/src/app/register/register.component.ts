import { Component, inject, OnInit } from '@angular/core';
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
export class RegisterComponent implements OnInit {
  user: User = new User()
  message: string = ""
  imgUrl = ""
  mastercardSrc = ""
  visaSrc = ""
  dinersSrc = ""

  private userService = inject(UserService)

  ngOnInit(): void {
    this.userService.getPictureBytes("mastercard").subscribe(data => {      
      this.mastercardSrc = this.userService.loadImg(data.pictureBytes)
    })

    this.userService.getPictureBytes("visa").subscribe(data => {
      this.visaSrc = this.userService.loadImg(data.pictureBytes)
    })

    this.userService.getPictureBytes("diners").subscribe(data => {
      this.dinersSrc = this.userService.loadImg(data.pictureBytes)
    })
  }

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

  onChange(){
    let mastercardPrefixes = ["51", "52", "53", "54", "55"]
    let visaPrefixes = ["4539", "4556", "4916", "4532", "4929", "4485", "4716"]
    let dinersPrefixes = ["300", "301", "302", "303", "36", "38"]
    let ccn = this.user.creditCardNumber

    for(let i = 0; i < mastercardPrefixes.length; i++){
      if(ccn.startsWith(mastercardPrefixes[i])){
        this.imgUrl = this.mastercardSrc
        return;
      }
    }

    for(let i = 0; i < visaPrefixes.length; i++){
      if(ccn.startsWith(visaPrefixes[i])){
        this.imgUrl = this.visaSrc
        return;
      }
    }

    for(let i = 0; i < dinersPrefixes.length; i++){
      if(ccn.startsWith(dinersPrefixes[i])){
        this.imgUrl = this.dinersSrc
        return;
      }
    }

    this.imgUrl = ""
  }
}
