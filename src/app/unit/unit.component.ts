import { Component, OnInit } from '@angular/core';
import { Scadenza } from '../scadenza.model';
import * as myGlobals from '../globals';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss'],
})
export class UnitComponent implements OnInit {

  today = myGlobals.today;
  public nextDate: Scadenza;

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
    console.log('nel constructor gli appuntamenti sono: ', appuntamenti);
    console.log('nextDate = ', this.nextDate);

  }

  ngOnInit() {
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
  }

}