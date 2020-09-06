import { SessionService } from './../../services/session.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private SessionService: SessionService) { }

  ngOnInit(): void {
  }

  /** calls SessionService to clear local & session storage */
  onLogout() {
    this.SessionService
    localStorage.removeItem('username')
    sessionStorage.removeItem('username')
    location.reload()
  }
}
