import { SessionService } from './../../services/session.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  cols: number = 1
  session: boolean = false

  constructor(private SessionService: SessionService) { 
    this.session = this.SessionService.session()
  }

  ngOnInit(): void {
  }

  expand() {
  }
}
