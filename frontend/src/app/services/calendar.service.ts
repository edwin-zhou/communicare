import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  url = environment.mainURL + "/api/user/schedule"

  constructor(private http: HttpClient) { }

  getSchedule() {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.url, {username: localStorage.getItem('username')}).subscribe((res) => {
        resolve(res)
      }, (err) => {
        reject(err)
      })
    })
  }
}
