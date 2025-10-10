import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-unregistered-user',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './unregistered-user.component.html',
  styleUrl: './unregistered-user.component.css'
})
export class UnregisteredUserComponent {

}
