import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ProfileComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  private userService = inject(UserService)
  ngOnInit(): void {
    this.user = this.userService.fetchUser()
  }

  user: User = new User()
}
