import { Injectable, OnInit } from '@angular/core';
import { Scadenza } from './scadenza.model';
import { DeadlineStatus } from './deadlineStatus.model';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Book } from './Book';
import { UnitComponent } from './unit/unit.component';
import { BehaviorSubject, Observable, of, from, Subscription } from 'rxjs';
import { take, map, tap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { today } from './globals';
import { UnitsData } from './units-data';
import { IBookData } from './ibook-data';
import { AuthenticationService } from './auth/authentication.service';
import { Question } from './question.model';

// interface unitsData {
//   appuntamenti: Scadenza[];
//   chapterFrom: string;
//   chapterTo: string;
//   createdOn: string;
//   libro: string;
//   nextDate: Scadenza;
//   overdueDates: boolean;
//   title: string;
//   today: string;
// };

@Injectable({
  providedIn: 'root'
})
export class ManagementService implements OnInit {

  constructor(private modalCtrl: ModalController, private http: HttpClient, private authService: AuthenticationService) { }

  private _books = new BehaviorSubject<Book[]>([]);
  private userId: string;

  get books() {
    return this._books.asObservable();
  }

  private _unitlist = new BehaviorSubject<UnitComponent[]>([]);

  get unitlist() {
    return this._unitlist.asObservable();
  }

  myProp = 'miaProprieta';

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

  // private _books: Book[] = [
  //   {
  //     titolo: 'libro di matematica',
  //     autore: 'un pazzo',
  //     pagine: 210
  //   },
  //   {
  //     titolo: 'libro di storia',
  //     autore: 'lucio',
  //     pagine: 144
  //   },
  //   {
  //     titolo: 'libro di geografia',
  //     autore: 'marco',
  //     pagine: 320
  //   },
  // ]



  // public get books(): Book[] {
  //   return this._books;
  // }

  addBook(form: NgForm) {
    let generatedBookId: string;
    const myBook: Book = {
      id: null,
      titolo: form.value.title,
      autore: form.value.autore,
      pagine: form.value.pagine
    };
    let fetchedUserId: string;
    return this.authService.userId.pipe(
      take(1),
      switchMap(userIdRes => {
        if (!userIdRes) {
          throw new Error('User not found!');
        }
        fetchedUserId = userIdRes;
        return this.authService.userIdToken;
      }),
      take(1),
      switchMap(token => {
        return this.http.post<{ name: string }>(`https://study-planner-w-authentication.firebaseio.com/users/${fetchedUserId}/books.json?auth=${token}`, myBook)
      }),
      take(1),
      switchMap(res => {
        console.log('alla aggiunta del libro ho ottenuto: ', res);
        generatedBookId = res.name;
        return this.books
      }),
      take(1),
      tap(res => {
        console.log('nella seconda parte di aggiunta di un libro ho ottenuto: ', res);
        myBook.id = generatedBookId;
        this._books.next(res.concat(myBook));
      })
    );
    // return this.http.post<{ name: string }>('https://study-planner-e6035.firebaseio.com/books.json', myBook)
    //   .pipe(
    //     switchMap(res => {
    //       console.log('alla aggiunta del libro ho ottenuto: ', res);
    //       generatedBookId = res.name;
    //       return this.books
    //     }),
    //     take(1)
    //   )
    //   .subscribe(res => {
    //     console.log('nella seconda parte di aggiunta di un libro ho ottenuto: ', res);
    //     myBook.id = generatedBookId;
    //     this._books.next(res.concat(myBook));
    //   });
  }

  fetchBooks() {
    let fetchedUserId: string;
    return this.authService.userId.pipe(
      take(1),
      switchMap(userIdRes => {
        if (!userIdRes) {
          throw new Error('User not found!');
        }
        fetchedUserId = userIdRes;
        return this.authService.userIdToken;
      }),
      take(1),
      switchMap(resToken => {
        return this.http.get<{ [key: string]: IBookData }>(`https://study-planner-w-authentication.firebaseio.com/users/${fetchedUserId}/books.json?auth=${resToken}`)
      }),
      take(1),
      map(resData => {
        let books: Book[] = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            books.push({
              id: key,
              titolo: resData[key].titolo,
              autore: resData[key].autore,
              pagine: resData[key].pagine
            })
          }
        }
        return books;
      }),
      tap(books => {
        console.log('sto inviando i books dopo il fetch: ', books);
        this._books.next(books);
      })
    )
    // return this.http.get<{ [key: string]: IBookData }>('https://study-planner-e6035.firebaseio.com/books.json')
    // .pipe(
    //   take(1),
    //   map(resData => {
    //     let books: Book[] = [];
    //     for (const key in resData) {
    //       if (resData.hasOwnProperty(key)) {
    //         books.push({
    //           id: key,
    //           titolo: resData[key].titolo,
    //           autore: resData[key].autore,
    //           pagine: resData[key].pagine
    //         })
    //       }
    //     }
    //     return books;
    //   }),
    //   tap(books => {
    //     console.log('sto inviando i books dopo il fetch: ', books);
    //     this._books.next(books);
    //   })
    // )
  }

  addUnit(form: NgForm, questions: Question[]) {
    let generatedId: string;
    const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 12);
    console.log('today is: ', today);
    const in2days = new Date(today.getTime() + 1000 * 60 * 60 * 24 * 2);
    const add5days = new Date(in2days.getTime() + 1000 * 60 * 60 * 24 * 5);
    const add7days = new Date(add5days.getTime() + 1000 * 60 * 60 * 24 * 7);
    const add13days = new Date(add7days.getTime() + 1000 * 60 * 60 * 24 * 13);
    const add20days = new Date(add13days.getTime() + 1000 * 60 * 60 * 24 * 20);
    // const appuntamenti: Date[] = [in2days, add5days, add7days, add13days, add20days];
    let myUnit = new UnitComponent(
      null,
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
      ],
      form.value.notes,
      questions
    );
    let fetchedUserId: string;
    return this.authService.userId.pipe(
      take(1),
      switchMap(userIdRes => {
        if (!userIdRes) {
          throw new Error('User not found!');
        }
        fetchedUserId = userIdRes;
        return this.authService.userIdToken;
      }),
      take(1),
      switchMap(token => {
        return this.http.post<{ name: string }>(`https://study-planner-w-authentication.firebaseio.com/users/${fetchedUserId}/units.json?auth=${token}`, myUnit)
      }),
      take(1),
      switchMap(res => {
        generatedId = res.name;
        myUnit.id = generatedId;
        console.log('ho ottenuto: ', res);
        return this.unitlist;
      }),
      take(1),
      tap(units => {
        console.log('ora sì ho ottenuto: ', units);
        this._unitlist.next(units.concat(myUnit));
        console.log('ora myUnit è: ', myUnit);
      })
    )
  }

  editUnit(form: NgForm, unitId: string, newQuestions: Question[]) {
    let fetchedUserId: string;
    let editedUnit: UnitComponent;
    let updFields = {
      title: form.value.riferimenti,
      libro: form.value.libro,
      chapterFrom: form.value.chapterFrom,
      chapterTo: form.value.chapterTo,
      notes: form.value.notes,
      questions: newQuestions
    };
    return this.authService.userId.pipe(
      take(1),
      switchMap(userIdRes => {
        if (!userIdRes) {
          throw new Error('User not found!');
        }
        fetchedUserId = userIdRes;
        return this.authService.userIdToken;
      }),
      take(1),
      switchMap(token => {
        return this.http.patch<{}>(`https://study-planner-w-authentication.firebaseio.com/users/${fetchedUserId}/units/${unitId}.json?auth=${token}`, updFields)
      }),
      take(1),
      switchMap(res => {
        console.log('ho ottenuto: ', res);
        return this.fetchUnits();
      }),
      tap(updatedUnits => {
        this._unitlist.next(updatedUnits);
      })
    )
  }

  rescheduleDates(unitId: string, appuntamenti: Scadenza[]) {
    let fetchedUserId: string;
    let payload = JSON.stringify(appuntamenti);
    return this.authService.userId.pipe(
      take(1),
      switchMap(userIdRes => {
        if (!userIdRes) {
          throw new Error('User not found!');
        }
        fetchedUserId = userIdRes;
        return this.authService.userIdToken;
      }),
      take(1),
      switchMap(token => {
        return this.http.put<{}>(`https://study-planner-w-authentication.firebaseio.com/users/${fetchedUserId}/units/${unitId}/appuntamenti.json?auth=${token}`, appuntamenti)
      }),
      take(1),
      switchMap(res => {
        console.log('ho ottenuto: ', res);
        return this.fetchUnits();
      }),
      tap(updatedUnits => {
        this._unitlist.next(updatedUnits);
      })
    )
  }

  resetDates(unit: UnitComponent) {
    let fetchedUserId: string;
    let appuntamenti: Scadenza[] = [];
    const newDate = new Date(unit.createdOn.getFullYear(), unit.createdOn.getMonth(), unit.createdOn.getDate(), 12, 0, 0, 0);
    console.log('new date is: ', newDate);
    const in2days = new Date(newDate.getTime() + 1000 * 60 * 60 * 24 * 2);
    const add5days = new Date(in2days.getTime() + 1000 * 60 * 60 * 24 * 5);
    const add7days = new Date(add5days.getTime() + 1000 * 60 * 60 * 24 * 7);
    const add13days = new Date(add7days.getTime() + 1000 * 60 * 60 * 24 * 13);
    const add20days = new Date(add13days.getTime() + 1000 * 60 * 60 * 24 * 20);
    appuntamenti = appuntamenti.concat(
      [
        new Scadenza(in2days, DeadlineStatus.Due),
        new Scadenza(add5days, DeadlineStatus.Due),
        new Scadenza(add7days, DeadlineStatus.Due),
        new Scadenza(add13days, DeadlineStatus.Due),
        new Scadenza(add20days, DeadlineStatus.Due)
      ]);
    return this.authService.userId.pipe(
      take(1),
      switchMap(userIdRes => {
        if (!userIdRes) {
          throw new Error('User not found!');
        }
        fetchedUserId = userIdRes;
        return this.authService.userIdToken;
      }),
      take(1),
      switchMap(token => {
        return this.http.put<{}>(`https://study-planner-w-authentication.firebaseio.com/users/${fetchedUserId}/units/${unit.id}/appuntamenti.json?auth=${token}`, appuntamenti)
      }),
      take(1),
      switchMap(res => {
        console.log('ho ottenuto: ', res);
        return this.fetchUnits();
      }),
      tap(updatedUnits => {
        this._unitlist.next(updatedUnits);
      })
    )
  }

  fetchUnits() {
    let fetchedUserId: string;
    return this.authService.userId.pipe(
      take(1),
      switchMap(userIdRes => {
        if (!userIdRes) {
          throw new Error('User not found!');
        }
        fetchedUserId = userIdRes;
        return this.authService.userIdToken;
      }),
      take(1),
      switchMap(token => {
        return this.http.get<{ [key: string]: UnitsData }>(`https://study-planner-w-authentication.firebaseio.com/users/${fetchedUserId}/units.json?auth=${token}`)
      }),
      take(1),
      map(resData => {
        let units: UnitComponent[] = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            let myAppuntamenti: Scadenza[] = [];
            for (let appuntamento of resData[key].appuntamenti) {
              let today = new Date();
              today.setHours(12, 0, 0, 0);
              // if (Date.UTC(new Date(appuntamento.giorno).getFullYear(), new Date(appuntamento.giorno).getMonth(), new Date(appuntamento.giorno).getDate()) - Date.UTC(today.getDate(), today.getMonth(), today.getDate()) < 0)
              // if (new Date(new Date(appuntamento.giorno).getFullYear(), new Date(appuntamento.giorno).getMonth(), new Date(appuntamento.giorno).getDate(), 12) < new Date(today.getDate(), today.getMonth(), today.getDate(), 12))
              if (appuntamento.giorno < today)
              {
                appuntamento.status = DeadlineStatus.Overdue;
              }
              myAppuntamenti.push(new Scadenza(new Date(appuntamento.giorno), appuntamento.status));
            }
            units.push(new UnitComponent(
              key,
              resData[key].title,
              resData[key].libro,
              resData[key].chapterFrom,
              resData[key].chapterTo,
              new Date(resData[key].createdOn),
              myAppuntamenti,
              resData[key].notes,
              resData[key].questions
            ))
          }
        }
        return units;
      }),
      tap(units => {
        console.log('sto inviando le units dopo il fetch: ', units);
        this._unitlist.next(units);
      })
    )
  }

  fetchUnit(unitId: string) {
    let fetchedUserId: string;
    return this.authService.userId.pipe(
      take(1),
      switchMap(userIdRes => {
        if (!userIdRes) {
          throw new Error('User not found!');
        }
        fetchedUserId = userIdRes;
        return this.authService.userIdToken;
      }),
      take(1),
      switchMap(token => {
        return this.http.get<{ fetchedUnit: UnitsData }>(`https://study-planner-w-authentication.firebaseio.com/users/${fetchedUserId}/units/${unitId}.json?auth=${token}`)
      })
    )
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

  getUnitById(unitId: string) {
    return this.unitlist.pipe(
      take(1),
      map(units => {
        return { ...units.find(unit => unit.id == unitId) };
      })
    )
  }

  updateUnit(myUnit: UnitComponent) {
    let updatedUnits: UnitComponent[];
    let fetchedUserId: string;
    let fetchedToken: string;
    return this.authService.userId.pipe(
      take(1),
      switchMap(resUserId => {
        if (!resUserId) {
          throw new Error('User not found!');
        }
        fetchedUserId = resUserId;
        return this.authService.userIdToken;
      }),
      take(1),
      switchMap(token => {
        if (!token) {
          throw new Error('Token not fount!');
        }
        fetchedToken = token;
        return this.unitlist;
      }),
      take(1),
      switchMap(units => {
        console.log('queste sono le units ricevute allo updateUnit: ', units);
        const updatedUnitIndex = units.findIndex(un => un.id === myUnit.id);
        updatedUnits = [...units];
        const oldUnit = updatedUnits[updatedUnitIndex];
        updatedUnits[updatedUnitIndex] = new UnitComponent(myUnit.id, myUnit.title, myUnit.libro, myUnit.chapterFrom, myUnit.chapterTo, myUnit.createdOn, myUnit.appuntamenti, myUnit.notes, myUnit.questions);
        return this.http.put(`https://study-planner-w-authentication.firebaseio.com/users/${fetchedUserId}/units/${myUnit.id}.json?auth=${fetchedToken}`,
          { ...myUnit, id: null }
        );
      }),
      tap((res) => {
        console.log('la risposta dopo lo update è: ', res);
        this._unitlist.next(updatedUnits);
      })
    )
  }


  // [new UnitComponent('id1', 'prima unita', 'primo libro', 'capitolo 1.1', 'capitolo 1.2', new Date(), [
  //   new Scadenza(
  //     new Date("2019-05-12"),
  //     DeadlineStatus.Done
  //   ),
  //   new Scadenza(
  //     new Date('2019-05-13'),
  //     DeadlineStatus.Done
  //   ),
  //   new Scadenza(
  //     new Date('2019-05-16'),
  //     DeadlineStatus.Due
  //   ),
  //   new Scadenza(
  //     new Date('2019-05-23'),
  //     DeadlineStatus.Due
  //   )
  // ]),
  // new UnitComponent('id2', 'seconda unita', 'secondo libro', 'capitolo 1.3', 'capitolo 1.5', new Date(), [
  //   new Scadenza(
  //     new Date("2019-05-14"),
  //     DeadlineStatus.Overdue
  //   ),
  //   new Scadenza(
  //     new Date('2019-05-15'),
  //     DeadlineStatus.Overdue
  //   ),
  //   new Scadenza(
  //     new Date('2019-05-18'),
  //     DeadlineStatus.Done
  //   ),
  //   new Scadenza(
  //     new Date('2019-05-25'),
  //     DeadlineStatus.Due
  //   )
  // ]),
  // new UnitComponent('id3', 'terza unita', 'terzo libro', 'capitolo 1.6', 'capitolo 1.8', new Date(), [
  //   new Scadenza(
  //     new Date("2019-05-18"),
  //     DeadlineStatus.Overdue
  //   ),
  //   new Scadenza(
  //     new Date('2019-05-19'),
  //     DeadlineStatus.Overdue
  //   ),
  //   new Scadenza(
  //     new Date('2019-05-22'),
  //     DeadlineStatus.Done
  //   ),
  //   new Scadenza(
  //     new Date('2019-05-29'),
  //     DeadlineStatus.Due
  //   )
  // ])
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
  // ]

}
