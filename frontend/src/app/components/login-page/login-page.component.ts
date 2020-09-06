import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';
import { LoginPageService } from 'src/app/services/login-page.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup
  login_err: boolean = false
  hide: boolean = true

  constructor(private sessionService: SessionService,
              private router:Router,
              private loginPageService: LoginPageService) {
    if (this.sessionService.session()) {
      this.router.navigate(['welcome-page'])
    }
  }

  ngOnInit() {
      this.loginForm = new FormGroup({
          'username': new FormControl(null, Validators.required),
          'password': new FormControl(null, Validators.required)
      })
  }

  //handle user login with socket
  loginClicked() {
    if (this.loginForm.invalid) {
      return;
    }
    let credentials = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    }
    this.loginPageService.login(credentials).subscribe(userData=>{
      if (userData) {
        sessionStorage.setItem('username', userData.username)
        localStorage.setItem('username', userData.username)
        this.sessionService.session()
        location.reload()
      }
      else{
        this.loginForm.reset();
        return;
      }
    })
  }
}
