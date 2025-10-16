import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CottagesComponent } from '../cottages/cottages.component';

@Component({
  selector: 'app-unregistered-user',
  standalone: true,
  imports: [RouterLink, CottagesComponent],
  templateUrl: './unregistered-user.component.html',
  styleUrl: './unregistered-user.component.css'
})
export class UnregisteredUserComponent {

}
