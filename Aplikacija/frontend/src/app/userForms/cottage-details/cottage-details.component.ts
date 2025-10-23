import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CottageService } from '../../services/cottage.service';
import { Cottage } from '../../models/cottage';
import { RoomRate } from '../../models/roomrate';
import { RoomrateService } from '../../services/roomrate.service';
import { DatePipe } from '@angular/common';
import { PictureService } from '../../services/picture.service';
import { PictureWrapper } from '../../models/picturewrapper';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-cottage-details',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './cottage-details.component.html',
  styleUrl: './cottage-details.component.css'
})
export class CottageDetailsComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute)
  private cottageService = inject(CottageService)
  private roomrateService = inject(RoomrateService)
  private pictureService = inject(PictureService)
  private userService = inject(UserService)
  ngOnInit(): void {
    let name = this.activatedRoute.snapshot.paramMap.get("name")!
    this.cottageService.getCottage(name).subscribe(data => {
      this.cottage = data
      this.roomrateService.getRoomRates(this.cottage.idC).subscribe(data => {
        this.roomrates = data        
      })
      this.pictureService.getPictures(this.cottage.idC).subscribe(data => {
        this.pictures = data
        this.imgUrls = this.pictures.map(picture => this.userService.loadImg(picture.pictureBytes))
      })
    })
  }

  cottage: Cottage = new Cottage()
  roomrates: RoomRate[] = []
  pictures: PictureWrapper[] = []
  imgUrls: string[] = []
}
