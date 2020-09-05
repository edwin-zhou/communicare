import { SessionService } from './services/session.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  session: boolean = false

  constructor(private SessionService: SessionService) {
    this.session = this.SessionService.session()
  }
}
