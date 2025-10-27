import { Component, inject, OnInit } from '@angular/core';
import { Reservation } from '../../models/reservation';
import { ReservationService } from '../../services/reservation.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Cottage } from '../../models/cottage';
import { CottageService } from '../../services/cottage.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tourist-reservations',
  standalone: true,
  imports: [DatePipe, FormsModule, CommonModule],
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
        this.currentReservations = data.filter(reservation => new Date(reservation.endDate!) >= new Date()).sort((a, b) => {
          if(a.reservationDate! < b.reservationDate!) return 1
          if(a.reservationDate! > b.reservationDate!) return -1
          return 0
        })
        this.archivedReservations = data.filter(reservation => new Date(reservation.endDate!) < new Date()).sort((a, b) => {
          if(a.endDate! < b.endDate!) return 1
          if(a.endDate! > b.endDate!) return -1
          return 0
        })
      })   
    })     
  }

  getCottageName(idC: number): string{
    return this.cottages.find(cottage => cottage.idC == idC)!.name
  }

  getCottageLocation(idC: number): string{
    return this.cottages.find(cottage => cottage.idC == idC)!.location
  }

  cancel(reservation: Reservation){
    this.reservationService.cancelReservation(reservation.idR).subscribe(data => {
      if(data == 1){
        this.ngOnInit()
      } else {
        this.message = "Дошло је до грешке при отказивању резервације!"
      }
    })
  }

  checkCancel(reservation: Reservation): boolean {
    return new Date(reservation.startDate!).getTime() - new Date().getTime() > 24 * 60 * 60 * 1000
  }

  currentReservations: Reservation[] = []
  archivedReservations: Reservation[] = []
  cottages: Cottage[] = []
  message: string = "";
}
