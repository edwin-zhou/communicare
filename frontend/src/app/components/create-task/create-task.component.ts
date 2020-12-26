import { SessionService } from './../../services/session.service';
import { CreateTaskService } from './../../services/create-task.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  session: boolean = false
  //tags
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: string[] = [];
  form: FormGroup
  //time
selectedValue: string;
frequencies: any[] = [
  {value: '365', viewValue: 'once'},
  {value: '1', viewValue: 'daily'},
  {value: '7', viewValue: 'weekly'},
  {value: '30', viewValue: 'monthly'},
];

  constructor(private createTaskService: CreateTaskService,
              private _snackBar: MatSnackBar,
              private SessionService: SessionService) {
    this.session = this.SessionService.session()
  }




  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      description: new FormControl(null, { validators: [Validators.required] }),
      qualifications: new FormControl(null, { validators: [] }),
      time: new FormControl(null, { validators: [Validators.required,Validators.minLength(2)] }),
      frequency: new FormControl(null, { validators: [Validators.required] }),
    })
  }

  onSaveTask() {
    if (this.form.invalid) {
      return;
    }
    let newTask = {
      start: this.form.value.time[0],
      end: this.form.value.time[1],
      frequency: +this.form.value.frequency,
      title: this.form.value.title,
      description: this.form.value.description,
      caregiver: "",
      customer: localStorage.getItem('username'),
      qualifications: this.tags,
    }
    console.log(newTask)
    this.createTaskService.createTask(newTask)
    this._snackBar.open('help request submitted!','thanks!',{
      duration: 5000
    })
    this.form.reset();
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
    this.form.patchValue({ tags: this.tags });
    this.form.get("qualifications").updateValueAndValidity();

  }

  removeTag(tag): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
    this.form.patchValue({ tags: this.tags });
    this.form.get("qualifications").updateValueAndValidity();
  }
}
