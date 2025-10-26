import { Component, inject, OnInit } from '@angular/core';
import { Cottage } from '../../models/cottage';
import { ActivatedRoute } from '@angular/router';
import { CottageService } from '../../services/cottage.service';
import { Reservation } from '../../models/reservation';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { RoomrateService } from '../../services/roomrate.service';
import { firstValueFrom, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../services/reservation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cottage-rent',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cottage-rent.component.html',
  styleUrl: './cottage-rent.component.css'
})
export class CottageRentComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute)
  private cottageService = inject(CottageService)
  private userService = inject(UserService)
  private roomrateService = inject(RoomrateService)
  private reservationService = inject(ReservationService)
  private router = inject(Router)
  
  ngOnInit(): void {
    let name = this.activatedRoute.snapshot.paramMap.get("name")!

    this.reservation.touristUsername = localStorage.getItem("loggedUser")!

    this.userService.getUser(this.reservation.touristUsername).subscribe(data => {
      this.user = data
    })

    this.reservation.status = "непознат"

    this.cottageService.getCottage(name).subscribe(data => {
      this.cottage = data
      this.reservation.idC = this.cottage.idC
    })

    this.userService.getPictureBytes("mastercard").subscribe(data => {      
      this.mastercardSrc = this.userService.loadImg(data.pictureBytes)
    })

    this.userService.getPictureBytes("visa").subscribe(data => {
      this.visaSrc = this.userService.loadImg(data.pictureBytes)
    })

    this.userService.getPictureBytes("diners").subscribe(data => {
      this.dinersSrc = this.userService.loadImg(data.pictureBytes)
    })    
  }

  onChange(){
    let mastercardPrefixes = ["51", "52", "53", "54", "55"]
    let visaPrefixes = ["4539", "4556", "4916", "4532", "4929", "4485", "4716"]
    let dinersPrefixes = ["300", "301", "302", "303", "36", "38"]
    let ccn = this.user.creditCardNumber

    for(let i = 0; i < mastercardPrefixes.length; i++){
      if(ccn.startsWith(mastercardPrefixes[i])){
        this.imgUrl = this.mastercardSrc
        return;
      }
    }

    for(let i = 0; i < visaPrefixes.length; i++){
      if(ccn.startsWith(visaPrefixes[i])){
        this.imgUrl = this.visaSrc
        return;
      }
    }

    for(let i = 0; i < dinersPrefixes.length; i++){
      if(ccn.startsWith(dinersPrefixes[i])){
        this.imgUrl = this.dinersSrc
        return;
      }
    }

    this.imgUrl = ""
  }

  async changeStep(){
    if(this.step === 1 && !this.checkData(1)) return;    
    if(this.step === 1) {
      this.reservation.price = await firstValueFrom(this.calculatePrice());
      if(this.reservation.price === -1){
        this.message = "Викендица не ради у датом периоду!"
        return
      }      
    }
    this.step = 3 - this.step;
    this.onChange();
  }

  calculatePrice(){
    return this.roomrateService.getPrice(this.cottage.idC, this.reservation)
  }

  checkData(step: number): boolean{    
    if(this.reservation.startDate === null || this.reservation.endDate === null){
      this.message = "Нису унети датуми почетка и завршетка резервације!"
      return false;
    }    

    if(new Date(this.reservation.startDate).getHours() < 14 || new Date(this.reservation.endDate).getHours() >= 10){
      this.message = "Улазак у викендицу је могућ од 14 часова, а излазак до 10 часова!"
      return false;
    }

    if(this.reservation.startDate > this.reservation.endDate) {
      this.message = "Датум завршетка резервације мора бити након датума почетка резервације!"
      return false;
    }

    if(this.reservation.numberOfAdults === 0 && this.reservation.numberOfChildren === 0){
      this.message = "Није унет број посетилаца!"
      return false;
    }

    if(step === 2){
      if(!this.userService.checkCreditCardNumber(this.user.creditCardNumber)){
        this.message = "Није добар број кредитне картице!"
        return false
      }

      if(this.reservation.additionalRequests.length > 500){
        this.message = "Поље за додатне захтеве може да има највише 500 карактера!"
        return false
      }
    }

    this.message = ""
    return true;
  }

  reserve(){
    if(!this.checkData(2)) return;
    this.reservation.reservationDate = new Date()
    this.reservationService.reserve(this.reservation).subscribe(data => {
      if(data === -1){
        this.message = "Нема слободног места!"
        return
      }
      if(data === 0){
        this.message = "Грешка при резервисању викендице!"
        return
      }
      alert("Захтев за резервисањем викендице успешно послат!")
      this.router.navigate([".."], {relativeTo: this.activatedRoute})
    })
  }

  step: number = 1;
  imgUrl = ""
  mastercardSrc = ""
  visaSrc = ""
  dinersSrc = ""

  cottage: Cottage = new Cottage()
  reservation: Reservation = new Reservation()
  user: User = new User();
  message: string = ""
}
