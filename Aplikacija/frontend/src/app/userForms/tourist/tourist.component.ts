import { Component, inject, OnInit } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-tourist',
  standalone: true,
  imports: [ProfileComponent],
  templateUrl: './tourist.component.html',
  styleUrl: './tourist.component.css'
})
export class TouristComponent implements OnInit {
  private userService = inject(UserService)
  ngOnInit(): void {
    this.user = this.userService.fetchUser()
  }

  user: User = new User()
}
