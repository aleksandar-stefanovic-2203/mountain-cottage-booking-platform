import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CottageService } from '../../services/cottage.service';
import { Cottage } from '../../models/cottage';

@Component({
  selector: 'app-cottage-details',
  standalone: true,
  imports: [],
  templateUrl: './cottage-details.component.html',
  styleUrl: './cottage-details.component.css'
})
export class CottageDetailsComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute)
  private cottageService = inject(CottageService)
  ngOnInit(): void {
    let name = this.activatedRoute.snapshot.paramMap.get("name")!
    this.cottageService.getCottage(name).subscribe(data => {
      this.cottage = data
    })
  }

  cottage: Cottage = new Cottage()
}
