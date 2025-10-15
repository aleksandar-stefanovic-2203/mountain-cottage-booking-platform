import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from '../../logout/logout.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule, LogoutComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: User = new User()
  private userService = inject(UserService)
  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  imgUrl = ""
  message = ""
  newProfilePicture = false
  
  ngOnInit(): void {
    let username = this.activatedRoute.snapshot.paramMap.get('username')!
    this.userService.getUser(username).subscribe(data => {
      this.user = data
      this.loadImg()
    })    
  }

  loadImg(){
    if(this.user.profilePictureBytes){
      const bytes = this.userService.stringToBytes(this.user.profilePictureBytes)
      this.imgUrl = this.userService.bytesToImage(bytes) //TODO Деалоцирање ресурса! (URL.revokeObjectURL(imgUrl))
    }
  }

  openChangePasswordWindow(){
    this.router.navigate(["/changePassword"])
  }

  async changePicture(event: any){
    this.message = await this.userService.changePicture(this.user, event)
  }

  updateData(){
    let message = this.userService.checkFields(this.user, false)

    if(message !== "Све је у реду"){
      this.message = message;
      return;
    }

    this.userService.updateData(this.user, this.newProfilePicture).subscribe(data => {
      if(data == 1){
        this.message = ""
        alert("Подаци ажурирани успешно!")
      } else {
        this.message = "Грешка при измени података!"
      }
    })
  }
}
