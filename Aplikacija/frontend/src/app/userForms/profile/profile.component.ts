import { Component, inject, Input, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  @Input('user') user: User = new User()
  private userService = inject(UserService)
  private router = inject(Router)
  imgUrl = ""
  ngOnInit(): void {
    if(this.user.profilePictureBytes){
      const bytes = this.userService.stringToBytes(this.user.profilePictureBytes)
      this.imgUrl = this.userService.bytesToImage(bytes) //TODO Деалоцирање ресурса! (URL.revokeObjectURL(imgUrl))
    }
  }

  openChangePasswordWindow(){
    this.router.navigate(["/changePassword"])
  }
}
