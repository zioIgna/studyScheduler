import { Component, OnInit } from '@angular/core';
import { Scadenza } from '../scadenza.model';
import * as myGlobals from '../globals';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss'],
})
export class UnitComponent {

  today = myGlobals.today;
  public nextDate: Scadenza;
  public pastDates: Scadenza[];
  public overdueDates: boolean;
  public id: string;

  constructor(
    public title: string,
    public libro: string,
    public chapterFrom: string,
    public chapterTo: string,
    public createdOn: Date,
    public appuntamenti: Scadenza[],
  ) {
    this.nextDate = this.appuntamenti.find(appuntamento => {
      return appuntamento.giorno.getTime() - this.today.getTime() >= 0;
    });
    // this.pastDates.splice(0, 0, ...(appuntamenti.filter(app => {
    //   return app.giorno.getTime() < this.today.getTime();
    //   console.log('app.giorno.getTime() è: ', app.giorno.getTime());
    //   console.log('i pastDates sono: ', this.pastDates);
    // })));
    this.pastDates = appuntamenti.filter(app => 
      // console.log('app.giorno.getTime() = ', app.giorno.getTime());
      app.giorno.getTime() < new Date().getTime()
    );
    console.log('pastDates ora sono: ', this.pastDates);
    this.overdueDates = (this.pastDates.findIndex(date => {
      return date.status == 'OVERDUE'
    }) >= 0);
    console.log('nel constructor gli appuntamenti sono: ', appuntamenti);
    console.log('nextDate = ', this.nextDate);
    console.log('overdueDates è: ', this.overdueDates);

  }

  // ngOnInit() {
    // this.nextDate = this.appuntamenti.find(appuntamento => {
    //   return appuntamento.giorno.getTime() - this.today.getTime() >= 0;
    // });
    // console.log('questi sono gli appuntamenti: ', this.appuntamenti);
    // if (this.appuntamenti.length > 0) {
    //   this.nextDate = this.appuntamenti[0];
    //   console.log('nextDate = ', this.nextDate);
    // } else {
    //   console.log('non si passa per la creazione di una unita');
    // }
  // }

}