import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service'
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

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
              private modalService:NgbModal,
              private router:Router) { }

  ngOnInit() {
      this.loginForm = new FormGroup({
          'username': new FormControl(null, Validators.required),
          'password': new FormControl(null, Validators.required)
      })
  }

  //handle user login with socket
  loginClicked() {
      if (!(sessionStorage.getItem('username'))) {
          let credentials = {
              email: this.loginForm.get('username').value,
              password: this.loginForm.get('password').value
          }
          this.login_err = false
          this.SocketService.emit('login', credentials, (data: any) => {
              if (data.err || data === '') {
                  console.log(data.err)
                  this.login_err = true
                  this.loginForm.get('password').reset()
              }
              else if (data.res) {
                  sessionStorage.setItem('username', data.res)
                  localStorage.setItem('token', data.token)
                  localStorage.setItem('username', data.res)
                  this.modalService.dismissAll()
                  this.sessionService.session()
                  this.router.navigate(['/home'])
              } else {
                  console.log('login error')
              }
          })
      } else {
          sessionStorage.removeItem('username')
          this.loginClicked()
      }
  }


}
