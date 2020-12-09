import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';
import { IEvent } from 'ionic2-calendar/calendar';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ManagementService } from '../management.service';
import { UnitComponent } from '../unit/unit.component';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {

  constructor(private managementSrv: ManagementService) { }

  eventSource: IEvent[] = [];
  // eventSource: IEvent[] = [
  //   {
  //     allDay: true,
  //     endTime: new Date(Date.UTC(2020, 11, 4)),
  //     startTime: new Date(Date.UTC(2020, 11, 3)),
  //     title: "Test event"
  //   }
  // ];
  overallUnits: UnitComponent[];
  private unitsSub: Subscription;
  viewTitle: string;
  @ViewChild(CalendarComponent) myCalendar: CalendarComponent;

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  ngOnInit() {
    console.log('EventSource: ', this.eventSource);
    this.managementSrv.fetchUnits()
      .pipe(
        map(arr => arr.filter(el => el.isArchived === false)),
        take(1)
      )
      .subscribe(units => {
        this.updateEvents(units);
      });
    this.unitsSub = this.managementSrv.unitlist
      .pipe(
        map(arr => arr.filter(el => el.isArchived === false))
      )
      .subscribe(units => {
        this.updateEvents(units);
      });
  }

  private updateEvents(units: UnitComponent[]) {
    this.overallUnits = units;
    this.mapToEvents(units);
    console.log("Questi sono gli eventi: ", this.eventSource);
  }

  private mapToEvents(units: UnitComponent[]) {
    this.eventSource = [];
    units.forEach(unit => {
      unit.appuntamenti.forEach(deadline => {
        let year = deadline.giorno.getUTCFullYear();
        let month = deadline.giorno.getMonth();
        let day = deadline.giorno.getDate();
        let event: IExtendedEvent = {
          allDay: true,
          startTime: new Date(Date.UTC(year, month, day)),
          endTime: new Date(Date.UTC(year, month, day + 1)),
          title: unit.title,
          unitId: unit.id
        }
        this.eventSource.push(event);
      });
    });
  }

  // Change current month/week/day
  next() {
    this.myCalendar.slideNext();
  }

  back() {
    this.myCalendar.slidePrev();
  }

  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

}

interface IExtendedEvent extends IEvent {
  unitId?: string;
}
