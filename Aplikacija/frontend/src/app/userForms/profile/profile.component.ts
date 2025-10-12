import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  @Input('user') user: User = new User()
  imgSrc = ""
  ngOnInit(): void {
    if(this.user.profilePicture){
      //this.imgSrc = URL.createObjectURL(this.user.profilePicture)
    }
  }
}
