import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Scadenza } from './scadenza.model';
import { DeadlineStatus } from './deadlineStatus.model';
import { NgForm } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
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
import { User } from './auth/user.model';
import { Router } from '@angular/router';

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
export class ManagementService implements OnInit, OnDestroy {

  constructor(
    private modalCtrl: ModalController,
    private http: HttpClient,
    private authService: AuthenticationService,
    private alertCtrl: AlertController,
    private router: Router
  ) { }

  private _books = new BehaviorSubject<Book[]>([]);
  private _userId: string;
  private _userToken: string;

  private _user: User;
  private _userSub: Subscription;

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
    this._userSub = this.authService.user.pipe(take(1)).subscribe(res => {
      this._user = res;
    });
  }

  ngOnDestroy(): void {
    if (this._userSub) {
      this._userSub.unsubscribe();
    }
    // throw new Error("Method not implemented.");
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

  getUserIdOnce() {
    return this.authService.userId.pipe(take(1));
  }

  getUserTokenOnce() {
    return this.authService.userIdToken.pipe(take(1));
  }

  addBook(form: NgForm, user: User) {
    let generatedBookId: string;
    const myBook: Book = {
      id: null,
      titolo: form.value.title,
      autore: form.value.autore,
      pagine: form.value.pagine
    };
    // return this.http.post<{ name: string }>('https://study-planner-e6035.firebaseio.com/books.json', myBook)
    return this.http.post<{ name: string }>(`https://study-planner-w-authentication.firebaseio.com/users/${user.id}/books.json?auth=${user.token}`, myBook)
      .pipe(
        switchMap(res => {
          console.log('alla aggiunta del libro ho ottenuto: ', res);
          generatedBookId = res.name;
          return this.books
        }),
        take(1)
      )
      .subscribe(res => {
        console.log('nella seconda parte di aggiunta di un libro ho ottenuto: ', res);
        myBook.id = generatedBookId;
        this._books.next(res.concat(myBook));
      },
        error => {
          this.alertCtrl.create({
            header: 'An error occurred!',
            message: 'Could not load book.',
            buttons: [
              {
                text: 'Okay',
                // handler: () => {
                //   this.router.navigateByUrl('/navigation/tabs/args');
                // }
              }
            ]
          }).then(alertEl => alertEl.present());
        }
      );
    // this._books.push(myBook);
    // console.log('questi sono i books: ', this._books);
  }

  fetchBooks(userId: string, userToken: string) {
    return this.http.get<{ [key: string]: IBookData }>(`https://study-planner-w-authentication.firebaseio.com/users/${userId}/books.json?auth=${userToken}`)
      .pipe(
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
    // return this.getUserIdOnce().subscribe(res => {
    //   this.userId = res;
    // })
  }

  addUnit(form: NgForm, user: User) {
    let generatedId: string;
    const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
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
      ]
    );
    // return this.http.post<{ name: string }>('https://study-planner-e6035.firebaseio.com/units.json', myUnit)
    return this.http.post<{ name: string }>(`https://study-planner-w-authentication.firebaseio.com/users/${user.id}/units.json?auth=${user.token}`, myUnit)
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
      },
        error => {
          this.alertCtrl.create({
            header: 'An error occurred!',
            message: 'Could not load book.',
            buttons: [
              {
                text: 'Okay',
                // handler: () => {
                //   this.router.navigateByUrl('/navigation/tabs/args');
                // }
              }
            ]
          }).then(alertEl => alertEl.present());
        }

      );
    // this.unitlist.pipe(take(1)).subscribe(units => {
    //   this._unitlist.next(units.concat(myUnit));
    // });

    // this.unitlist.push(myUnit);
    // this.modalCtrl.dismiss();
    this.sortUnitList();
    console.log('le units ora sono: ', this.unitlist);
  }

  fetchUnits(userId: string, userToken: string) {
    // return this.http.get<{ [key: string]: UnitsData }>(`https://study-planner-e6035.firebaseio.com/units.json?auth=${userToken}`)
    return this.http.get<{ [key: string]: UnitsData }>(`https://study-planner-w-authentication.firebaseio.com/users/${userId}/units.json?auth=${userToken}`)
      .pipe(
        // tap(resData => {
        //   console.log('queste sono le units nel database: ', resData);
        //   return resData;
        // }),
        take(1),
        map(resData => {
          let units: UnitComponent[] = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              let myAppuntamenti: Scadenza[] = [];
              for (let appuntamento of resData[key].appuntamenti) {
                let today = new Date();
                if (Date.UTC(new Date(appuntamento.giorno).getFullYear(), new Date(appuntamento.giorno).getMonth(), new Date(appuntamento.giorno).getDate()) - Date.UTC(today.getDate(), today.getMonth(), today.getDate()) < 0) {
                  // if (new Date(appuntamento.giorno).getTime() < new Date().getTime() && appuntamento.status == 'DUE') {
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
                // resData[key].appuntamenti
                myAppuntamenti
              ))
            }
          }
          return units;
        }),
        tap(units => {
          console.log('sto inviando le units dopo il fetch: ', units);
          this._unitlist.next(units);
        })
      );
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

  updateUnit(myUnit: UnitComponent, user: User) {
    // return this.getUserTokenOnce().subscribe(res => {
    //   this._userToken = res;
    // });
    let updatedUnits: UnitComponent[];
    return this.unitlist.pipe(
      // take(1),
      // switchMap(units => {
      //   if (!units || units.length == 0) {
      //     return this.fetchUnits();
      //   } else {
      //     return of(units);
      //   }
      // }),
      take(1),
      switchMap(units => {
        console.log('queste sono le units ricevute allo updateUnit: ', units);
        const updatedUnitIndex = units.findIndex(un => un.id === myUnit.id);
        updatedUnits = [...units];
        const oldUnit = updatedUnits[updatedUnitIndex];
        // updatedUnits[updatedUnitIndex] = myUnit;
        updatedUnits[updatedUnitIndex] = new UnitComponent(myUnit.id, myUnit.title, myUnit.libro, myUnit.chapterFrom, myUnit.chapterTo, myUnit.createdOn, myUnit.appuntamenti);
        // return this.http.put(`https://study-planner-e6035.firebaseio.com/units/${myUnit.id}.json`,
        return this.http.put(`https://study-planner-w-authentication.firebaseio.com/users/${user.id}/units/${myUnit.id}.json?auth=${user.token}`,
          { ...myUnit, id: null }
        );
      }),
      tap((res) => {
        console.log('la risposta dopo lo update è: ', res);
        this._unitlist.next(updatedUnits);
      })
    );

    // this.http.put(`https://study-planner-e6035.firebaseio.com/units/${myUnit.id}.json`,
    //   { ...myUnit, id: null }
    // ).pipe(
    //   tap(() =>{
    //     let newUnits = units.filter(unit => unit.id != myUnit.id);
    //   })

    // ).subscribe(units =>{

    // });

    this.unitlist.pipe(take(1)).subscribe(units => {
      let newUnits = units.filter(unit => unit.id != myUnit.id);
      // newUnits = newUnits.concat(myUnit);
      newUnits.push(myUnit);
      this._unitlist.next(newUnits);
      // console.log('ora la unitlist aggiornata è: ', newUnits);
      this.unitlist.pipe(take(1)).subscribe(units => {
        this.sortUnitList();
        console.log('ora la unitlist aggiornata è: ', units);
      });
    })
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
