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
      start: new Date(),
      end: new Date(),
      title: this.form.value.title,
      description: this.form.value.description,
      caregiver: "",
      customer: localStorage.getItem('username'),
      qualifications: ["xd"],
    }
    this.createTaskService.createTask(newTask)
    this.form.reset();
  }
}
