import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CottageService } from '../../services/cottage.service';
import { Cottage } from '../../models/cottage';
import { RoomRate } from '../../models/roomrate';
import { RoomrateService } from '../../services/roomrate.service';
import { DatePipe } from '@angular/common';

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
  ngOnInit(): void {
    let name = this.activatedRoute.snapshot.paramMap.get("name")!
    this.cottageService.getCottage(name).subscribe(data => {
      this.cottage = data
      this.roomrateService.getRoomRates(this.cottage.idC).subscribe(data => {
        this.roomrates = data        
      })
    })
  }

  cottage: Cottage = new Cottage()
  roomrates: RoomRate[] = []
}
