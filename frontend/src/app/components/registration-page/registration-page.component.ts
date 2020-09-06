import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { SessionService } from 'src/app/services/session.service';
import { RegistrationPageService } from 'src/app/services/registration-page.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  private sessionState_sub: Subscription
  sessionState: Boolean
  registrationForm:FormGroup;
  hide = true;
  hide1 = true;

  //tags
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: string[] = [];

  constructor(
    private sessionService: SessionService,
    private registrationPageService: RegistrationPageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      'passwords': new FormGroup({
        'password': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
        'confirmPassword': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
      }, this.checkPasswordsMatch.bind(this)),
      'username': new FormControl(null,[ Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
      'qualifications': new FormControl(null),
      'checkbox': new FormControl(null, [Validators.required]),
    })

    this.sessionState_sub = this.sessionService.sessionState.subscribe((state: boolean) => {
      this.sessionState = state
    })
  }

  onSubmit()  {
    // check form validity && if logged in
    if(!this.registrationForm.valid){
      return
    }
    let data : {username: string, password: string, qualifications: string[]} = {
      username: this.registrationForm.get('username').value,
      password: this.registrationForm.get('passwords.password').value,
      qualifications: this.registrationForm.get('qualifications').value,
    }
    this.registrationPageService.register(data).subscribe(
      userData=>{
        sessionStorage.setItem('username', userData.user.username)
        localStorage.setItem('username', userData.user.username)
      }
    )
    location.reload()
  }
  checkPasswordValidity: boolean = false
  checkPasswordsMatch(control: FormControl) {
    if (this.registrationForm) {
      let pass: string = control.get('password').value
      let confirm: string = control.get('confirmPassword').value
      if (pass === confirm) {
        this.checkPasswordValidity = false
        return
      } else {
        if(control.get('confirmPassword').dirty) {
          this.checkPasswordValidity = true
        }
        return
      }
    }
  }
  checkPasswordLength() {
    if (this.registrationForm.get('passwords.password').errors && this.registrationForm.get('passwords.password').dirty){
      if (this.registrationForm.get('passwords.password').errors['maxlength'] || this.registrationForm.get('passwords.password').errors['minlength']){
        return true
      }
    }
  }
  checkUsernameLength() {
    if (this.registrationForm.get('username').errors && this.registrationForm.get('username').dirty){
      if (this.registrationForm.get('username').errors['maxlength'] || this.registrationForm.get('username').errors['minlength']){
        return true
      }
    } else {
        return false
      }
  }

  addTag(event): void {
    const input = event.input;
    const value = event.value;

    // Add a tag
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.registrationForm.patchValue({ tags: this.tags });
    this.registrationForm.get("qualifications").updateValueAndValidity();

  }

  removeTag(tag): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
    this.registrationForm.patchValue({ tags: this.tags });
    this.registrationForm.get("qualifications").updateValueAndValidity();
  }
}
