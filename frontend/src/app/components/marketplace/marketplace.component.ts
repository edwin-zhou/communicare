import { SessionService } from './../../services/session.service';
import { HelpService } from './../../services/help.service';
import { Component, OnInit } from '@angular/core';
import { task } from './../../models/task.model'

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss']
})
export class MarketplaceComponent implements OnInit {
  tasks: task[] = []
  cols: number = 5 
  session: boolean = false

  constructor(public help: HelpService,
              private SessionService: SessionService) {
    this.session = this.SessionService.session()
  }

  ngOnInit(): void {
    this.getTasks()
  }


  giveHelp(task: task) {
    this.help.accept(task).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
    this.getTasks()
  }

  getTasks() {
    this.help.getTasks().then((res: task[]) => {
      this.tasks = res
    })
  }
}
