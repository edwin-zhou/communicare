import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationPageService {
  url = "http://localhost:3000/api/user"
  constructor(
    private http: HttpClient
  ) { }
  /** creates new user and outputs user data if succesful*/
  register(newUserdata: {username: string, password: string, qualifications: string[]}){
     return this.http
    .post<{ message: string; user: userModel}>(
      this.url,newUserdata
    )
  }
}
