import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  url = environment.mainURL + "/api/tasks/searchTasks"

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
      .post<{message: string; data: any}>(this.url, {'username': username}).subscribe((res) => {
        resolve(res)
      }, (err) => {
        reject(err)
      })
    })
  }

}
