import { CreateTaskService } from './../../services/create-task.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  form: FormGroup

  constructor(private createTaskService: CreateTaskService) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      description: new FormControl(null, { validators: [Validators.required] }),
      tags: new FormControl(null, { validators: [Validators.required] }),
    })
  }

  onSaveTask() {
    if (this.form.invalid) {
      return;
    }
    let newTask = {
      start: this.form.value.start,
      end: this.form.value.end,
      title: this.form.value.title,
      description: this.form.value.description,
      caregiver: "",
      customer: this.form.value.customer,
      qualifications: this.form.value.tags,
    }
    this.createTaskService.createTask(newTask)
    this.form.reset();
  }
}
