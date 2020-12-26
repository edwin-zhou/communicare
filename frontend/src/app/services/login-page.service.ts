import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { userModel } from '../models/user.model';
import { environment } from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginPageService {
  url = environment.mainURL + "/api/user/login"
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  //returns user info with credentials
  login(credentials: {username: string, password: string}){
    return this.http.post<{
      username: string
      password: string
      category: string[]
      caregivers: []
      customers: []
      schedule: []
      obj?: any
    }>(this.url, credentials);
  }



}
