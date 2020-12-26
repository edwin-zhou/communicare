import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  url = environment.mainURL + "/api/task/searchTasks/"

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
  getTasks(username: string) {
    return new Promise((resolve, reject) => {
      this.http
      .get<{message: string; data: any}>(this.url+ username).subscribe((res) => {
        console.log(res);
        resolve(res)
      }, (err) => {
        reject(err)
      })
    })
  }

}
