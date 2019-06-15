import { Injectable, OnInit } from '@angular/core';
import { Scadenza } from './scadenza.model';
import { DeadlineStatus } from './deadlineStatus.model';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Book } from './Book';
import { UnitComponent } from './unit/unit.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, map, tap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManagementService implements OnInit {
  ngOnInit(): void {
    this.sortUnitList();
  }

  sortUnitList() {
    this.unitlist.pipe(take(1)).subscribe(units => {
      this._unitlist.next(units.sort((unitA, unitB) =>
        unitA.createdOn > unitB.createdOn ? -1 : 1
      ))
    });
  }

  private _books: Book[] = [
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

  private _unitlist = new BehaviorSubject<UnitComponent[]>([
    new UnitComponent('prima unita', 'primo libro', 'capitolo 1.1', 'capitolo 1.2', new Date(), [
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
    new UnitComponent('seconda unita', 'secondo libro', 'capitolo 1.3', 'capitolo 1.5', new Date(), [
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
    new UnitComponent('terza unita', 'terzo libro', 'capitolo 1.6', 'capitolo 1.8', new Date(), [
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
  ]);

  get unitlist() {
    return this._unitlist.asObservable();
  }

  myProp = 'miaProprieta';

  constructor(private modalCtrl: ModalController, private http: HttpClient) { }

  public get books(): Book[] {
    return this._books;
  }

  addBook(form: NgForm) {
    const myBook: Book = {
      titolo: form.value.title,
      autore: form.value.autore,
      pagine: form.value.pagine
    };
    this._books.push(myBook);
    // this.modalCtrl.dismiss();
    console.log('questi sono i books: ', this._books);
  }

  addUnit(form: NgForm) {
    let generatedId: string;
    const today = new Date();
    console.log('today is: ', today);
    const in2days = new Date(today.getTime() + 1000 * 60 * 60 * 24 * 2);
    const add5days = new Date(in2days.getTime() + 1000 * 60 * 60 * 24 * 5);
    const add7days = new Date(add5days.getTime() + 1000 * 60 * 60 * 24 * 7);
    const add13days = new Date(add7days.getTime() + 1000 * 60 * 60 * 24 * 13);
    const add20days = new Date(add13days.getTime() + 1000 * 60 * 60 * 24 * 20);
    // const appuntamenti: Date[] = [in2days, add5days, add7days, add13days, add20days];
    let myUnit = new UnitComponent(
      form.value.riferimenti,
      form.value.libro,
      form.value.chapterFrom,
      form.value.chapterTo,
      today,
      [
        new Scadenza(in2days, DeadlineStatus.Due),
        new Scadenza(add5days, DeadlineStatus.Due),
        new Scadenza(add7days, DeadlineStatus.Due),
        new Scadenza(add13days, DeadlineStatus.Due),
        new Scadenza(add20days, DeadlineStatus.Due)
      ]
    );
    this.http.post<{ name: string }>('https://study-planner-e6035.firebaseio.com/units.json', myUnit)
      .pipe(
        switchMap(res => {
          generatedId = res.name;
          myUnit.id = generatedId;
          console.log('ho ottenuto: ', res);
          return this.unitlist
        }),
        take(1)
        // tap(units => {
        //   myUnit.id = generatedId;
        //   this._unitlist.next(units.concat(myUnit));
        // })
      )
      .subscribe(res => {
        console.log('ora sì ho ottenuto: ', res);
        this._unitlist.next(res.concat(myUnit));
        console.log('ora myUnit è: ', myUnit);
      });
    // this.unitlist.pipe(take(1)).subscribe(units => {
    //   this._unitlist.next(units.concat(myUnit));
    // });

    // this.unitlist.push(myUnit);
    // this.modalCtrl.dismiss();
    this.sortUnitList();
    console.log('le units ora sono: ', this.unitlist);
  }

  getUnit(unitName: string) {
    return this.unitlist.pipe(
      take(1),
      map(units => {
        return { ...units.find(unit => unit.title == unitName) };
      })
    )
    // return this.unitlist.find(unit => {
    //   return unit.title == unitName;
    // })
  }

  updateUnit(myUnit: UnitComponent) {
    this.unitlist.pipe(take(1)).subscribe(units => {
      let newUnits = units.filter(unit => unit.title != myUnit.title);
      newUnits = newUnits.concat(myUnit);
      this._unitlist.next(newUnits);
      // console.log('ora la unitlist aggiornata è: ', newUnits);
      this.unitlist.pipe(take(1)).subscribe(units => {
        this.sortUnitList();
        console.log('ora la unitlist aggiornata è: ', units);
      });
    })
  }

}
