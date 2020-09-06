import { Router } from '@angular/router';
import { SessionService } from './services/session.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Communicare';
  session: boolean = false
  username: string = ''

  constructor(private SessionService: SessionService,
              private Router: Router) {
    this.session = this.SessionService.session()
    if (this.session) {
      this.username = sessionStorage.getItem('username')
    }
  }
}
