import { Component, inject, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../models/reservation';
import { Cottage } from '../../models/cottage';
import { CottageService } from '../../services/cottage.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-owner-reservations',
  standalone: true,
  imports: [DatePipe, FormsModule],
  templateUrl: './owner-reservations.component.html',
  styleUrl: './owner-reservations.component.css'
})
export class OwnerReservationsComponent implements OnInit {
  private reservationService = inject(ReservationService)
  private cottageService = inject(CottageService)
  ngOnInit(): void {
    let username = localStorage.getItem("loggedUser")!
    this.cottageService.getCottages(username).subscribe(data => {
      this.cottages = data;
      this.reservationService.getReservationsOwner(username).subscribe(data => {
      this.reservations = data;
      this.newReservations = this.reservations.filter(reservation => reservation.status === "непознат").sort((a, b) => {
        if(a.reservationDate! < b.reservationDate!) return 1
        if(a.reservationDate! > b.reservationDate!) return -1
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

  accept(reservation: Reservation){
    this.reservationService.setStatusAndComment(reservation.idR, "прихваћена", reservation.comment).subscribe(data => {
      if(data === 1){
        this.message = ""
        this.ngOnInit();
      } else {
        this.message = "Дошло је до грешке при прихватању резервације!"
      }
    })
  }

  reject(reservation: Reservation){
    if(reservation.comment === ""){
      this.message = "Код одбијенице мора да се унесе коментар!"
      return
    }
    this.reservationService.setStatusAndComment(reservation.idR, "одбијена", reservation.comment).subscribe(data => {
      if(data === 1){
        this.message = ""
        this.ngOnInit();
      } else {
        this.message = "Дошло је до грешке при одбијању резервације!"
      }
    })
  }

  reservations: Reservation[] = []
  newReservations: Reservation[] = []
  cottages: Cottage[] = []
  message: string = ""
}
