import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SessionService {
    // observable for login state
    private _sessionState: BehaviorSubject<boolean> = new BehaviorSubject(false)
    public sessionState: Observable<boolean> = this._sessionState.asObservable()

  constructor() { }

  session(): boolean {
    if (sessionStorage.getItem('username')) {
      this._sessionState.next(true)
      return true
    } else {
      this._sessionState.next(false)
      return false
    }
  }
}
