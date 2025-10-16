import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  private userService = inject(UserService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data.filter(user => user.type !== 'администратор')
    })
    this.userService.getAllRegistrationRequests().subscribe(data => {
      this.registrationRequests = data.filter(user => user.type !== 'администратор')
    })
  }

  accept(registrationRequest: User){
    this.userService.changeStatus(registrationRequest.username, "активан").subscribe(data => {
      if(data == 1){
        this.message = ""
        this.ngOnInit()
      } else {
        this.message = "Грешка!"
      }
    })
  }

  reject(registrationRequest: User){
    this.userService.changeStatus(registrationRequest.username, "неактиван").subscribe(data => {
      if(data == 1){
        this.message = ""
        this.ngOnInit()
      } else {
        this.message = "Грешка!"
      }
    })
  }

  changeStatus(user: User){
    if(user.status === "активан") this.reject(user)
    else this.accept(user)
  }

  seeProfile(user: User){
    this.router.navigate([`${user.username}`], {relativeTo: this.route, queryParams: {changePassword: 'не', changeType: 'да'}})
  }

  users: User[] = []
  registrationRequests: User[] = []
  message = ""
}
