import { Component, inject } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LogoutComponent } from '../../logout/logout.component';

@Component({
  selector: 'app-owner',
  standalone: true,
  imports: [ProfileComponent, CommonModule, RouterOutlet, LogoutComponent, RouterModule],
  templateUrl: './owner.component.html',
  styleUrl: './owner.component.css'
})
export class OwnerComponent {
  private userService = inject(UserService)
  ngOnInit(): void {
    this.userService.fetchUser().subscribe(data => {
      this.user = data
    })
  }

  user: User = new User()
}
