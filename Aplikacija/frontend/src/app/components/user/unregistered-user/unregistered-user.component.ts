import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CottageListComponent } from '../../cottages/cottage-list/cottage-list.component';
import { ReservationService } from '../../../services/reservation.service';
import { Reservation } from '../../../models/reservation';

@Component({
  selector: 'app-unregistered-user',
  standalone: true,
  imports: [RouterLink, CottageListComponent],
  templateUrl: './unregistered-user.component.html',
  styleUrl: './unregistered-user.component.css'
})
export class UnregisteredUserComponent implements OnInit {
  private reservationService = inject(ReservationService)
  ngOnInit(): void {
    this.reservationService.getReservations(null).subscribe(data => {
      this.reservations = data.filter(reservation => reservation.status == "прихваћена")
    })
  }

  getNumberOfReservations(days: number){
    const msInDay = 24 * 60 * 60 * 1000;
    return this.reservations.filter(reservation => new Date().getTime() - new Date(reservation.reservationDate!).getTime() <= days * msInDay).length
  }

  reservations: Reservation[] = []
}
