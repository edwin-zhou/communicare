import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.data.start = new Date()
    this.data.end = new Date()
  }


}
