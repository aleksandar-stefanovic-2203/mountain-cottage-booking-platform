import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { ProfileComponent } from '../profile/profile.component';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ProfileComponent, CommonModule, RouterOutlet, RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit { //TODO: Додати guard-ове за руте!!!
  private userService = inject(UserService)
  ngOnInit(): void {
    this.userService.fetchUser().subscribe(data => {
      this.user = data      
    })
  }

  user: User = new User()  
}
