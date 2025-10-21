import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  constructor() { }

  private http = inject(HttpClient)
    
  private backPath = "http://localhost:8080/pictures"

  async changePictures(event: any): Promise<File[]>{
    let pictures = event.target.files
    if(!pictures) return []

    try {
      const value = await this.checkImages(pictures);

      if (value) {
        return Array.from(pictures)
      } else {
        event.target.value = "";
        return []
      }
    } catch (err) {
      event.target.value = "";
      return [];
    }
  }

  checkImages(files: File[]): Promise<boolean> {
    const allowedTypes = ['image/jpeg', 'image/png'];
    for(let i = 0; i < files.length; i++){
      if(!allowedTypes.includes(files[i].type)) return Promise.resolve(false);
    }

    return Promise.resolve(true);
  }

  insertPictures(files: File[], idC: number) {
    if(files.length === 0) return of(1);
    const formData = new FormData()

    formData.append("idC", JSON.stringify(idC))
    files.forEach(file => {
      formData.append("pictures", file)
    })

    return this.http.post<number>(`${this.backPath}/insertPictures`, formData)
  }
}
