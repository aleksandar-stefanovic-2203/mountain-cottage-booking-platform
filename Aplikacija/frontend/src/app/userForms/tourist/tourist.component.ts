import { Component, inject, OnInit } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LogoutComponent } from '../../logout/logout.component';

@Component({
  selector: 'app-tourist',
  standalone: true,
  imports: [ProfileComponent, CommonModule, RouterOutlet, LogoutComponent, RouterModule],
  templateUrl: './tourist.component.html',
  styleUrl: './tourist.component.css'
})
export class TouristComponent implements OnInit {
  private userService = inject(UserService)
  ngOnInit(): void {
    this.userService.fetchUser().subscribe(data => {
      this.user = data
      this.imgUrl = this.userService.loadImg(this.user.profilePictureBytes)
    })
  }

  user: User = new User()
  imgUrl: string = ""
}
