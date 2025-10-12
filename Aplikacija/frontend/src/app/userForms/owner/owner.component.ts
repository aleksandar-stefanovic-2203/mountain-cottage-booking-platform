import { Component, inject } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-owner',
  standalone: true,
  imports: [ProfileComponent],
  templateUrl: './owner.component.html',
  styleUrl: './owner.component.css'
})
export class OwnerComponent {
  private userService = inject(UserService)
    ngOnInit(): void {
      this.user = this.userService.fetchUser()
    }
  
    user: User = new User()
}
