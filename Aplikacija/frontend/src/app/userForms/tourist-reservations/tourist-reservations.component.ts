import { Component, inject, OnInit } from '@angular/core';
import { Reservation } from '../../models/reservation';
import { ReservationService } from '../../services/reservation.service';
import { DatePipe } from '@angular/common';
import { Cottage } from '../../models/cottage';
import { CottageService } from '../../services/cottage.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tourist-reservations',
  standalone: true,
  imports: [DatePipe, FormsModule],
  templateUrl: './tourist-reservations.component.html',
  styleUrl: './tourist-reservations.component.css'
})
export class TouristReservationsComponent implements OnInit {
  private reservationService = inject(ReservationService)
  private cottageService = inject(CottageService)
  ngOnInit(): void {
    this.cottageService.getCottages(null).subscribe(data => {
      this.cottages = data
      this.reservationService.getReservations(localStorage.getItem("loggedUser")!).subscribe(data => {
        this.currentReservations = data.filter(reservation => new Date(reservation.endDate!) >= new Date())
        this.archivedReservations = data.filter(reservation => new Date(reservation.endDate!) < new Date())
      })   
    })     
  }

  getCottageName(idC: number): string{
    return this.cottages.find(cottage => cottage.idC == idC)!.name
  }

  getCottageLocation(idC: number): string{
    return this.cottages.find(cottage => cottage.idC == idC)!.location
  }

  currentReservations: Reservation[] = []
  archivedReservations: Reservation[] = []
  cottages: Cottage[] = []
}
