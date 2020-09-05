import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class CreateTaskService {
  url = "http://localhost:3000/api/task"

  constructor(private http: HttpClient) { }

  createTask(task: task) {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.url, task).subscribe((res) => {
        resolve('xd')
      }, (err) => {
        reject('not xd')
      })
    })
  }
}
