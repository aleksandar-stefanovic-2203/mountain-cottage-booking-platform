import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Cottage } from '../models/cottage';

@Injectable({
  providedIn: 'root'
})
export class CottageService {

  constructor() { }

  private http = inject(HttpClient)
  
  private backPath = "http://localhost:8080/cottages"

  getCottage(name: string){
    return this.http.get<Cottage>(`${this.backPath}/${name}`)
  }

  getCottages(username: string | null = null){
    return this.http.get<Cottage[]>(`${this.backPath}` + (username ? `?ownerUsername=${username}` : ``))
  }
  
  deleteCottage(idC: number){
    return this.http.delete<number>(`${this.backPath}/deleteCottage/${idC}`)
  }

  insertCottage(cottage: Cottage){
    return this.http.post<number>(`${this.backPath}/insertCottage`, cottage)
  }

  checkFields(cottage: Cottage): string{
    if(cottage.name === "" || cottage.location === ""){
      return "Нису сва обавезна поља за викендицу попуњена! (назив и/или место викендице)"
    }

    return "Све је у реду"
  }
}
