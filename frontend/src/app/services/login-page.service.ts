import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { userModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginPageService {
  url = "http://localhost:3000/api/user"
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  //returns user info with credentials
  login(credentials: {username: string, password: string}){
    return this.http.get<{
      username: string
      password: string
      category: string
      caregivers: []
      customers: []
      schedule: []
    }>(this.url,{headers: credentials});
  }



}
