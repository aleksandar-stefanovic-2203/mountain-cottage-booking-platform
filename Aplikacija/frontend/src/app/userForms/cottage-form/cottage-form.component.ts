import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CottageService } from '../../services/cottage.service';
import { Cottage } from '../../models/cottage';
import { FormsModule } from '@angular/forms';
import { RoomrateService } from '../../services/roomrate.service';
import { RoomRate } from '../../models/roomrate';
import { CommonModule, DatePipe } from '@angular/common';
import { PictureService } from '../../services/picture.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cottage-form',
  standalone: true,
  imports: [FormsModule, DatePipe, CommonModule],
  templateUrl: './cottage-form.component.html',
  styleUrl: './cottage-form.component.css'
})
export class CottageFormComponent implements OnInit {
  Math = Math
  readonly minNumberOfRoomRates: number = 2
  readonly maxNumberOfRoomRates: number = 10
  @Input("operation") operation: "insert" | "update" = "update"
  @Input("ownerUsername") ownerUsername: string | null = null
  @Output("refresh") refresh: EventEmitter<any> = new EventEmitter()
  numberOfRoomRates: number = 2
  private activatedRoute = inject(ActivatedRoute)
  private cottageService = inject(CottageService)
  private roomrateService = inject(RoomrateService)
  private pictureService = inject(PictureService)
  private router = inject(Router)
  
  ngOnInit(): void {
    this.cottage.ownerUsername = this.ownerUsername!
    if(this.operation === "update"){
      let name = this.activatedRoute.snapshot.paramMap.get("name")!
      this.cottageService.getCottage(name).subscribe(data => {
        this.cottage = data
        this.roomrateService.getRoomRates(this.cottage.idC).subscribe(data => {
          for(let i = 0; i < data.length; i++){
            this.roomrates[i] = data[i]
          }
          this.numberOfRoomRates = data.length
        })
      })
    }
  }

  onChange(){
    let lastIndex = this.roomrates.slice().reverse().findIndex(roomrate => roomrate.periodName !== "")
    this.numberOfRoomRates = lastIndex == -1 ? this.minNumberOfRoomRates : this.Math.max(this.minNumberOfRoomRates, this.maxNumberOfRoomRates - lastIndex)
  }

  async changePicture(event: any){
    this.pictures = await this.pictureService.changePictures(event)
    this.message = this.pictures.length !== 0 ? "" : "Дошло је до грешке при учитавању слика!"
  }

  insertCottage(){
    let message = this.cottageService.checkFields(this.cottage)
    if(message != "Све је у реду"){
      this.message = message
      return
    }
    let activeRoomRates = this.roomrates.slice(0, this.numberOfRoomRates)
    message = this.roomrateService.checkFields(activeRoomRates)
    if(message != "Све је у реду"){
      this.message = message
      return
    }

    this.cottageService.insertCottage(this.cottage).subscribe(idC => {
      if(idC === 0){
        this.message = "Дошло је до грешке при уносу података о викендици!"
        return;
      }
      
      activeRoomRates.forEach(roomrate => roomrate.idC = idC)

      this.roomrateService.insertRoomRates(activeRoomRates).subscribe(data => {
        if(data === 0){
          this.message = "Дошло је до грешке при уносу ценовника викендица!"
          return
        }

        this.pictureService.insertPictures(this.pictures, idC).subscribe(data => {
          if(data === 0){
            this.message = "Дошло је до грешке при слању слика!"
            return
          }
          this.message = ""
          this.refresh.emit("refresh");
        })
      })
    })
  }

  updateCottage(){
    let message = this.cottageService.checkFields(this.cottage)
    if(message != "Све је у реду"){
      this.message = message
      return
    }
    let activeRoomRates = this.roomrates.slice(0, this.numberOfRoomRates)
    message = this.roomrateService.checkFields(activeRoomRates)
    if(message != "Све је у реду"){
      this.message = message
      return
    }

    this.cottageService.updateCottage(this.cottage).subscribe(data => {
      if(data === 0){
        this.message = "Дошло је до грешке при уносу података о викендици!"
        return;
      }

      let idC = this.cottage.idC
      activeRoomRates.forEach(roomrate => roomrate.idC = idC)
      let updatedRoomRates = activeRoomRates.filter(roomrate => roomrate.idRR > 0)
      let insertedRoomRates = activeRoomRates.filter(roomrate => roomrate.idRR == 0)

      this.roomrateService.updateRoomRates(updatedRoomRates).subscribe(data => {
        if(data === 0){
          this.message = "Дошло је до грешке при измени ценовника викендица!"
          return;
        }

        this.roomrateService.insertRoomRates(insertedRoomRates).subscribe(data => {
          if(data === 0){
            this.message = "Дошло је до грешке при уносу ценовника викендица!"
            return
          }

          this.pictureService.insertPictures(this.pictures, idC).subscribe(data => {
            if(data === 0){
              this.message = "Дошло је до грешке при слању слика!"
              return
            }
            this.message = ""
            alert("Викендица успешно ажурирана!")
            this.router.navigate([`../${this.cottage.name}`], {relativeTo: this.activatedRoute})
          })
        })
      })
    })
  }

  cottage: Cottage = new Cottage()
  roomrates: RoomRate[] = Array.from({length: this.maxNumberOfRoomRates}, (value, index) => index >= 2 ? new RoomRate() : new RoomRate(index === 0 ? "летњи" : "зимски"))
  pictures: File[] = []

  message = ""
}
