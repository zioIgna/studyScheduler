import { Injectable } from '@angular/core';
import { Unit } from './unit.model';
import { Scadenza } from './scadenza.model';
import { DeadlineStatus } from './deadlineStatus.model';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

interface Book {
  titolo: string;
  autore: string;
  pagine: number
}

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  books: Book[] = [
    {
      titolo: 'libro di matematica',
      autore: 'un pazzo',
      pagine: 210
    },
    {
      titolo: 'libro di storia',
      autore: 'lucio',
      pagine: 144
    },
    {
      titolo: 'libro di geografia',
      autore: 'marco',
      pagine: 320
    },
  ]

  unitlist: Unit[] = [
    new Unit('prima unita', 'capitolo 1.1', 'capitolo 1.2', new Date(), [
      new Scadenza(
        new Date("2019-05-12"),
        DeadlineStatus.Done
      ),
      new Scadenza(
        new Date('2019-05-13'),
        DeadlineStatus.Done
      ),
      new Scadenza(
        new Date('2019-05-16'),
        DeadlineStatus.Due
      ),
      new Scadenza(
        new Date('2019-05-23'),
        DeadlineStatus.Due
      )
    ]),
    new Unit('seconda unita', 'capitolo 1.3', 'capitolo 1.5', new Date(), [
      new Scadenza(
        new Date("2019-05-14"),
        DeadlineStatus.Overdue
      ),
      new Scadenza(
        new Date('2019-05-15'),
        DeadlineStatus.Overdue
      ),
      new Scadenza(
        new Date('2019-05-18'),
        DeadlineStatus.Done
      ),
      new Scadenza(
        new Date('2019-05-25'),
        DeadlineStatus.Due
      )
    ]),
    new Unit('terza unita', 'capitolo 1.6', 'capitolo 1.8', new Date(), [
      new Scadenza(
        new Date("2019-05-18"),
        DeadlineStatus.Overdue
      ),
      new Scadenza(
        new Date('2019-05-19'),
        DeadlineStatus.Overdue
      ),
      new Scadenza(
        new Date('2019-05-22'),
        DeadlineStatus.Done
      ),
      new Scadenza(
        new Date('2019-05-29'),
        DeadlineStatus.Due
      )
    ])
    // {
    //   title: 'prima unita',
    //   chapterFrom: 'capitolo 1.1',
    //   chapterTo: 'capitolo 1.2',
    //   appuntamenti: [
    //     new Scadenza(
    //       new Date("2019-05-12"),
    //       DeadlineStatus.Done
    //     ),
    //     new Scadenza(
    //       new Date('2019-05-13'),
    //       DeadlineStatus.Done
    //     ),
    //     new Scadenza(
    //       new Date('2019-05-16'),
    //       DeadlineStatus.Due
    //     ),
    //     new Scadenza(
    //       new Date('2019-05-23'),
    //       DeadlineStatus.Due
    //     )
    //   ]
    // },
    // {
    //   title: 'seconda unita',
    //   chapterFrom: 'capitolo 1.3',
    //   chapterTo: 'capitolo 1.5',
    //   appuntamenti: [
    //     new Scadenza(
    //       new Date("2019-05-14"),
    //       DeadlineStatus.Overdue
    //     ),
    //     new Scadenza(
    //       new Date('2019-05-15'),
    //       DeadlineStatus.Overdue
    //     ),
    //     new Scadenza(
    //       new Date('2019-05-18'),
    //       DeadlineStatus.Done
    //     ),
    //     new Scadenza(
    //       new Date('2019-05-25'),
    //       DeadlineStatus.Due
    //     )
    //   ]
    // },
    // {
    //   title: 'terza unita',
    //   chapterFrom: 'capitolo 1.6',
    //   chapterTo: 'capitolo 1.8',
    //   appuntamenti: [
    //     new Scadenza(
    //       new Date("2019-05-18"),
    //       DeadlineStatus.Overdue
    //     ),
    //     new Scadenza(
    //       new Date('2019-05-19'),
    //       DeadlineStatus.Overdue
    //     ),
    //     new Scadenza(
    //       new Date('2019-05-22'),
    //       DeadlineStatus.Done
    //     ),
    //     new Scadenza(
    //       new Date('2019-05-29'),
    //       DeadlineStatus.Due
    //     )
    //   ]
    // }
  ];

  myProp = 'miaProprieta';

  constructor(private modalCtrl: ModalController) { }

  addBook(form: NgForm) {
    const myBook: Book = {
      titolo: form.value.title,
      autore: form.value.autore,
      pagine: form.value.pagine
    };
    this.books.push(myBook);
    this.modalCtrl.dismiss();
    console.log('questi sono i books: ', this.books);
  }
}
