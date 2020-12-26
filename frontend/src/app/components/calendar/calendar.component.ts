import { CalendarService } from './../../services/calendar.service';
import { Component,ChangeDetectionStrategy,ViewChild,TemplateRef, ChangeDetectorRef, OnInit,} from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent as any, CalendarView, } from 'angular-calendar';
import { SessionService } from 'src/app/services/session.service';
import parseISO from 'date-fns/parseISO'
import { MatDialog } from '@angular/material/dialog';
import { ViewTaskComponent } from '../view-task/view-task.component';

const colors: any = {
  customer: {
    primary: '#dd9292',
    secondary: '##c7e7db',
  },
  caregiver: {
    primary: '##7fc4bc',
    secondary: '#a3fac3',
  },
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit{
  session: boolean = false
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;


  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: any;
  };

  refresh: Subject<any> = new Subject();

  recurringEvents: any[] = [
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'An event',
      customer: 'bobo',
      frequency: 7
    },
  ];
  events: any[] = []
  activeDayIsOpen: boolean = true;

  constructor(public dialog: MatDialog,
              private calendarService: CalendarService,
              private SessionService: SessionService) {
    this.session = this.SessionService.session()
  }

  ngOnInit(){
    if (this.SessionService.session()) {
      this.calendarService.getTasks(sessionStorage.getItem("username")).then((res: any) => {
        console.log(res)
        this.recurringEvents = res;
        this.recurringEvents.forEach(event =>{
          for(let i=0; i < 365/event.frequency; i ++){
            event.start = new Date()
            event.end = new Date()
            this.events.push({
            title: event.title,
            description: event.description,
            qualifications: event.qualifications,
            start :  addDays(event.start, i * event.frequency),
            end: addHours(addDays(event.end, i * event.frequency),2),
            frequency: event.frequency,
            caregiver: event.caregiver,
            customer: event.customer,
            color : (sessionStorage.getItem("username") === event.customer) ? colors.customer : colors.caregiver
            })
          }
        })
      }).catch((err) => {
        console.log(err)
      })
    }
  }


  dayClicked({ date, events }: { date: Date; events: any[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  handleEvent(event): void {
    this.dialog.open(ViewTaskComponent, {data:event});

  }


  setView(view: CalendarView) {
    this.view = view;
  }
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
