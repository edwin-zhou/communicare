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
    })
  }

  onSaveTask() {
    if (this.form.invalid) {
      return;
    }
    let newTask = {
      start: new Date(),
      end: new Date(),
      title: this.form.value.title,
      description: this.form.value.description,
      caregiver: "",
      customer: localStorage.getItem('username'),
      qualifications: ["xd"],
    }
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
