import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RoomRate } from '../models/roomrate';

@Injectable({
  providedIn: 'root'
})
export class RoomrateService {

  constructor() { }

  private http = inject(HttpClient)
    
  private backPath = "http://localhost:8080/roomrates"

  getRoomRates(idC: number){
    return this.http.get<RoomRate[]>(`${this.backPath}?idC=${idC}`);
  }

  checkFields(roomrates: RoomRate[]): string{
    for(let i = 0; i < roomrates.length; i++){
      if(roomrates[i].periodName === "" || roomrates[i].periodStart === null || roomrates[i].periodEnd === null || roomrates[i].priceAdult === 0 || roomrates[i].priceChild === 0){
        return `Нису сва поља попуњена за ${i+1}. ценовник ноћења!`
      }
      if(roomrates[i].periodStart! > roomrates[i].periodEnd!){
        return `${i+1}. ценовник: датум завршетка периода мора бити после датума почетка периода!`
      }
    }

    return "Све је у реду"
  }

  insertRoomRates(roomrates: RoomRate[]){
    return this.http.post<number>(`${this.backPath}/insertRoomRates`, roomrates)
  }
}
