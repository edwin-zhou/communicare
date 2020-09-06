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
      this.getTasks()
    }).catch((err) => {
      console.log(err)
    })
  }

  getTasks() {
    this.help.getTasks().then((res: task[]) => {
      this.tasks = res
    })
  }

  /** check if user is qualified to view task */
  checkTag(task: task): boolean {
    console.log(this.SessionService.userTags)
    console.log()
    if (task.qualifications.length >= 1 && this.SessionService.userTags.length == 0) {
      return false
    } else if (task.qualifications) {
      for (let qual of task.qualifications) {

        if (!this.SessionService.userTags.includes(qual)) {
          return false
        }
      }
      return true
    } else {
      return true
    }
  }
}
