import { task } from './../models/task.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpService {
  url = "http://localhost:3000/api/task/"

  constructor(private http: HttpClient) { }

  accept(task: any) {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.url + "accept", {username: localStorage.getItem('username'), title: task.title}).subscribe((res) => {
        resolve(res)
      }, (err) => {
        reject('not xd')
      })
    })
  }

  getTasks() {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.url + "help", {username: localStorage.getItem('username')}).subscribe((res) => {
        resolve(res)
      }, (err) => {
        reject('not xd')
      })
    })
  }
}
