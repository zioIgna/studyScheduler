import { Component, OnInit } from '@angular/core';
import { Scadenza } from '../scadenza.model';
import { DeadlineStatus } from '../deadlineStatus.model';
import { Question } from '../question.model';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss'],
})
export class UnitComponent {
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
    public notes: string,
    public questions: Question[],
    public isArchived: boolean
  ) {
    const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 12, 0, 0, 0);
    this.nextDate = appuntamenti.find(function (appuntamento) {
      return (new Date(appuntamento.giorno) >= today);
    });
    this.pastDates = appuntamenti.filter(app =>
      new Date(app.giorno) < today
    );
    for (let pastDate of this.pastDates) {
      if (pastDate.status == 'DUE') {
        pastDate.status = DeadlineStatus.Overdue;
      }
    };
    console.log('pastDates ora sono: ', this.pastDates);
    this.overdueDates = (this.pastDates.findIndex(date => {
      return date.status == 'OVERDUE'
    }) >= 0);
    console.log('nel constructor gli appuntamenti sono: ', JSON.stringify(appuntamenti));
    console.log('nextDate = ', this.nextDate);
    console.log('overdueDates è: ', this.overdueDates);
  }
}