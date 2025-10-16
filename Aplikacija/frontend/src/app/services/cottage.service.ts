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

  getCottages(username: string | null = null){
    return this.http.get<Cottage[]>(`${this.backPath}` + (username ? `?ownerUsername=${username}` : ``))
  }
  
}
