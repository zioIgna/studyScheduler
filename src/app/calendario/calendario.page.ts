import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';
import { IEvent } from 'ionic2-calendar/calendar';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ManagementService } from '../management.service';
import { UnitComponent } from '../unit/unit.component';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {

  constructor(private managementSrv: ManagementService) { }

  eventSource: IEvent[] = [
    {
      allDay: true,
      endTime: new Date(Date.UTC(2020, 11, 23)),
      startTime: new Date(Date.UTC(2020, 11, 24)),
      title: "Test event"
    }
  ];
  overallUnits: UnitComponent[];
  private unitsSub: Subscription;
  viewTitle: string;
  @ViewChild(CalendarComponent) myCalendar:CalendarComponent;

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  ngOnInit() {
    console.log('EventSource: ', this.eventSource);
    // let event: IEvent = {
    //   allDay: true,
    //   endTime: new Date(Date.UTC(2020, 11, 23)),
    //   startTime: new Date(Date.UTC(2020, 11, 23)),
    //   title: "Test event"
    // }
    // this.eventSource.push(event);
    // this.unitsSub = this.managementSrv.fetchUnits().pipe(take(1)).subscribe(units => {
    //   this.overallUnits = units;
    //   this.mapToEvents(units);
    //   console.log("Questi sono gli eventi: ", this.eventSource);
    // })
  }


  private mapToEvents(units: UnitComponent[]) {
    units.forEach(unit => {
      unit.appuntamenti.forEach(deadline => {
        let year = deadline.giorno.getFullYear();
        let month = deadline.giorno.getMonth();
        let day = deadline.giorno.getDate();
        let event: IEvent = {
          allDay: true,
          startTime: new Date(Date.UTC(year, month, day, 0)),
          endTime: new Date(Date.UTC(year, month, day, 0)),
          title: unit.title
        }
        this.eventSource.push(event);
      });
    });
  }

}
