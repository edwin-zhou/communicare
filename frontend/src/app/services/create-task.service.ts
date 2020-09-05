import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class CreateTaskService {
  url = "http://localhost:3000/api/user"

  constructor(private http: HttpClient) { }

  createTask(task: task) {
    return this.http.post<any>(this.url, task);
  }
}
