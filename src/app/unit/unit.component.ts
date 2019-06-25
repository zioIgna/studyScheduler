import { Component, OnInit } from '@angular/core';
import { Scadenza } from '../scadenza.model';
import { DeadlineStatus } from '../deadlineStatus.model';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss'],
})
export class UnitComponent {

  // today = myGlobals.today;
  public nextDate: Scadenza;
  public pastDates: Scadenza[];
  public overdueDates: boolean;

  constructor(
    public id: string,
    public title: string,
    public libro: string,
    public chapterFrom: string,
    public chapterTo: string,
    public createdOn: Date,
    public appuntamenti: Scadenza[],
    // private managementSrv: ManagementService
  ) {
    const today = new Date();
    this.nextDate = appuntamenti.find(function (appuntamento) {
      // return new Date(appuntamento.giorno).getTime() - today.getTime() >= 0;
      return (Date.UTC(new Date(appuntamento.giorno).getFullYear(), new Date(appuntamento.giorno).getMonth(), new Date(appuntamento.giorno).getDate()) - Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())) >= 0;
      // console.log('res = ', res);
      // return res;
    });
    // this.pastDates.splice(0, 0, ...(appuntamenti.filter(app => {
    //   return app.giorno.getTime() < this.today.getTime();
    //   console.log('app.giorno.getTime() è: ', app.giorno.getTime());
    //   console.log('i pastDates sono: ', this.pastDates);
    // })));
    this.pastDates = appuntamenti.filter(app =>
      // console.log('app.giorno.getTime() = ', app.giorno.getTime());
      // new Date(app.giorno).getTime() < new Date().getTime()
      Date.UTC(new Date(app.giorno).getFullYear(), new Date(app.giorno).getMonth(), new Date(app.giorno).getDate(),) < Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
    );
    // let didUpdate = false;
    for (let pastDate of this.pastDates) {
      if (pastDate.status == 'DUE') {
        pastDate.status = DeadlineStatus.Overdue;
        // didUpdate = true;
      }
    };
    console.log('pastDates ora sono: ', this.pastDates);
    this.overdueDates = (this.pastDates.findIndex(date => {
      return date.status == 'OVERDUE'
    }) >= 0);
    console.log('nel constructor gli appuntamenti sono: ', appuntamenti);
    console.log('nextDate = ', this.nextDate);
    console.log('overdueDates è: ', this.overdueDates);
    // if(didUpdate){
    //   this.http.put(`https://study-planner-e6035.firebaseio.com/units/${id}.json`,
    //       // { ...myUnit, id: null }
    //       {title: this.title, libro: this.libro, chapterFrom: this.chapterFrom, chapterTo: this.chapterTo, createdOn: this.createdOn, appuntamenti: this.appuntamenti, nextDate: this.nextDate, pastDates: this.pastDates, overdueDates: this.overdueDates}
    //     );
    // }

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