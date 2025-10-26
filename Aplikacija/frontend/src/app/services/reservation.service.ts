import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor() { }

  private http = inject(HttpClient)
      
  private backPath = "http://localhost:8080/reservations"

  reserve(reservation: Reservation){
    return this.http.post<number>(`${this.backPath}/reserve`, reservation)
  }

  getReservations(touristUsername: string | null){
    return this.http.get<Reservation[]>(`${this.backPath}` + ((touristUsername != null) ? `?touristUsername=${touristUsername}` : ""))
  }

  getReservationsOwner(ownerUsername: string){
    return this.http.get<Reservation[]>(`${this.backPath}/owner?ownerUsername=${ownerUsername}`)
  }

  setStatusAndComment(idR: number, status: string, comment: string){
    return this.http.patch<number>(`${this.backPath}/setStatusAndComment/${idR}`, {status: status, comment: comment})
  }
}
