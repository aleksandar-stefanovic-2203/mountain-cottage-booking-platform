import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{
  private userService = inject(UserService)
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data.filter(user => user.type !== 'А')
    })
    this.userService.getAllRegistrationRequests().subscribe(data => {
      this.registrationRequests = data.filter(user => user.type !== 'А')
    })
  }

  getTypeName(type: string): string{
    switch (type) {
      case 'А':
        return "Администратор"

      case 'В':
        return "Власник"

      case 'Т':
        return "Туриста"
    
      default:
        return "Непознат"
    }
  }

  users: User[] = []
  registrationRequests: User[] = []
}
