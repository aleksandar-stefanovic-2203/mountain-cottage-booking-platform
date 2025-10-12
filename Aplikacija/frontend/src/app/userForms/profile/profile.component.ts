import { Component, inject, Input, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

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
  imgUrl = ""
  ngOnInit(): void {
    if(this.user.profilePictureBytes){
      const bytes = this.userService.stringToBytes(this.user.profilePictureBytes)
      this.imgUrl = this.userService.bytesToImage(bytes)
    }
  }
}
