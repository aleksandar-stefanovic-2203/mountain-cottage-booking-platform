import { Component, inject, OnInit } from '@angular/core';
import { CottageService } from '../../services/cottage.service';
import { Cottage } from '../../models/cottage';
import { UserService } from '../../services/user.service';
import { UserInfo } from '../../models/userinfo';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CottageFormComponent } from '../cottage-form/cottage-form.component';

@Component({
  selector: 'app-cottages',
  standalone: true,
  imports: [FormsModule, CommonModule, CottageFormComponent],
  templateUrl: './cottages.component.html',
  styleUrl: './cottages.component.css'
})
export class CottagesComponent implements OnInit{
  private cottageService = inject(CottageService)
  private userService = inject(UserService)
  private activatedRoute = inject(ActivatedRoute)
  private router = inject(Router)

  ngOnInit(): void {
    let t = this.activatedRoute.snapshot.queryParamMap.get("type")
    this.ownerUsername = this.activatedRoute.snapshot.queryParamMap.get("ownerUsername")
    if(t){
      this.type = t
    }
    this.cottageService.getCottages(this.ownerUsername).subscribe(data => {
      this.allCottages = this.selectedCottages = data
    })
    this.userService.getUserInfo().subscribe(data => {
      this.userInfo = data
    })
  }

  onChange(){
    this.selectedCottages = this.allCottages.filter(cottage => (
      cottage.name.toLowerCase().includes(this.name.toLowerCase()) && 
      cottage.location.toLowerCase().includes(this.location.toLowerCase()))
    )

    this.sortCottages()
  }

  sortByName(){
    switch (this.nameFilter) {
      case "none":
        this.nameFilter = "asc"
        break;
    
      case "asc":
        this.nameFilter = "desc"
        break;

      case "desc":
        this.nameFilter = "none"
        break;

      default:
        break;
    }

    this.sortCottages();
  }

  sortByLocation(){
    switch (this.locationFilter) {
      case "none":
        this.locationFilter = "asc"
        break;
    
      case "asc":
        this.locationFilter = "desc"
        break;

      case "desc":
        this.locationFilter = "none"
        break;

      default:
        break;
    }

    this.sortCottages();
  }

  sortCottages(){
    switch(this.nameFilter + "," + this.locationFilter){
      case "none,none":
        this.selectedCottages.sort((a, b) => a.idC - b.idC)
        break
        
      case "asc,none":
        this.selectedCottages.sort((a, b) => {
          if(a.name > b.name) return 1;
          if(a.name === b.name) return 0;
          return -1;
        })
        break;
      
      case "desc,none":
        this.selectedCottages.sort((a, b) => {
          if(a.name < b.name) return 1;
          if(a.name === b.name) return 0;
          return -1;
        })
        break;
      
      case "none,asc":
        this.selectedCottages.sort((a, b) => {
          if(a.location > b.location) return 1;
          if(a.location === b.location) return 0;
          return -1;
        })
        break;

      case "none,desc":
        this.selectedCottages.sort((a, b) => {
          if(a.location < b.location) return 1;
          if(a.location === b.location) return 0;
          return -1;
        })
        break;

      case "asc,asc":
        this.selectedCottages.sort((a, b) => {
          if(a.name > b.name) return 1;
          if(a.name === b.name && a.location > b.location) return 1;
          if(a.name === b.name && a.location === b.location) return 0;
          return -1;
        })
        break;

      case "asc,desc":
        this.selectedCottages.sort((a, b) => {
          if(a.name > b.name) return 1;
          if(a.name === b.name && a.location < b.location) return 1;
          if(a.name === b.name && a.location === b.location) return 0;
          return -1;
        })
        break;

      case "desc,asc":
        this.selectedCottages.sort((a, b) => {
          if(a.name < b.name) return 1;
          if(a.name === b.name && a.location > b.location) return 1;
          if(a.name === b.name && a.location === b.location) return 0;
          return -1;
        })
        break;

      case "desc,desc":
        this.selectedCottages.sort((a, b) => {
          if(a.name < b.name) return 1;
          if(a.name === b.name && a.location < b.location) return 1;
          if(a.name === b.name && a.location === b.location) return 0;
          return -1;
        })
        break;
    }
  }

  getNameLabel(){
    let value = "Назив"
    switch (this.nameFilter) {
      case "asc":
        value += " (растуће)"
        break;

      case "desc":
        value += " (опадајуће)"
        break;
    
      default:
        break;
    }

    return value
  }

  getLocationLabel(){
    let value = "Место"
    switch (this.locationFilter) {
      case "asc":
        value += " (растуће)"
        break;

      case "desc":
        value += " (опадајуће)"
        break;
    
      default:
        break;
    }

    return value
  }

  seeDetails(cottage: Cottage){
    this.router.navigate([`${cottage.name}`], {relativeTo: this.activatedRoute})
  }

  deleteCottage(cottage: Cottage){
    this.cottageService.deleteCottage(cottage.idC).subscribe(data => {
      if(data === 1){
        this.ngOnInit()
      } else {
        alert("Дошло је до грешке при брисању викендице!")
      }
    })
  }

  editCottage(cottage: Cottage){
    this.router.navigate([`${cottage.name}`], {relativeTo: this.activatedRoute})
  }

  refreshPage(){
    this.ngOnInit()
  }

  selectedCottages: Cottage[] = []
  allCottages: Cottage[] = []
  userInfo: UserInfo = new UserInfo()
  name = ""
  location = ""
  nameFilter = "none"
  locationFilter = "none"
  type = ""
  ownerUsername: string | null = null
}
