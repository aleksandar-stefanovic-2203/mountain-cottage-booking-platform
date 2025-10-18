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
}
