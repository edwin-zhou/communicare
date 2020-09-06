import { CalendarService } from './../../services/calendar.service';
import { Component,ChangeDetectionStrategy,ViewChild,TemplateRef, ChangeDetectorRef, OnInit,} from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarView, } from 'angular-calendar';
import { SessionService } from 'src/app/services/session.service';

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

  view: CalendarView = CalendarView.Day;


  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
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
  events: CalendarEvent[] = []
  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal,
              private calendarService: CalendarService,
              private SessionService: SessionService) {
    this.session = this.SessionService.session()
  }

  ngOnInit(){
    if (this.SessionService.session()) {
      this.calendarService.getSchedule().then((res: any) => {
        this.recurringEvents = res
        console.log(res)
        this.recurringEvents.forEach(event =>{
          for(let i=0; i < 365/event.frequency; i ++){
            this.events.push({
            start : addDays(event.start, Math.fround(i * event.frequency)),
            end: addDays(event.end, Math.fround(i * event.frequency)),
            title: event.title,
            color : (sessionStorage.getItem("username") === event.customer) ? colors.customer : colors.caregiver
            })
          }
        })
      }).catch((err) => {
        console.log(err)
      })
    }

  }


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
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

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }
  setView(view: CalendarView) {
    this.view = view;
  }
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
