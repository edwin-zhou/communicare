import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpService {
  url = "http://localhost:3000/api/task/help"

  constructor(private http: HttpClient) { }

  getTasks() {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.url, {username: localStorage.getItem('username')}).subscribe((res) => {
        resolve(res)
      }, (err) => {
        reject('not xd')
      })
    })
  }
}
