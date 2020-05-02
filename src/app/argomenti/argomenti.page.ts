import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { ManagementService } from '../management.service';
import { NewBookComponent } from '../new-book/new-book.component';
import { NewUnitComponent } from '../new-unit/new-unit.component';
import { UnitComponent } from '../unit/unit.component';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators/';
import { AuthenticationService } from '../auth/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-argomenti',
  templateUrl: './argomenti.page.html',
  styleUrls: ['./argomenti.page.scss'],
})
export class ArgomentiPage implements OnInit, OnDestroy {
  private unitList: UnitComponent[];
  private futureDatesUnits: UnitComponent[];
  private todayUnits: UnitComponent[];
  private tomorrowUnits: UnitComponent[];
  private nextDaysUnits: UnitComponent[];
  private pastDatesUnits: UnitComponent[];
  private archivedUnits: UnitComponent[];
  private unitsSub: Subscription;
  private userIdTokenSub: Subscription;
  private userIdToken: string;
  private showArchived = false;

  constructor(
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private managementSrv: ManagementService,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  onShowConsole() {
    console.log('Bottone cliccato!');
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }

  onAddBook() {
    this.modalCtrl.create({
      component: NewBookComponent
    }).then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    });
    console.log('Aggiunto libro');
    // this.managementSrv.books.push({
    //   autore: "nuovo arrivato",
    //   pagine: 40,
    //   titolo: "un titolo a caso"
    // });
    // console.log('questi sono i libri:', this.managementSrv.books);
    // console.log('questa è la mia proprieta: ', this.managementSrv.myProp);
  }

  onAddUnita() {
    this.modalCtrl.create({
      component: NewUnitComponent
    }).then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    });
    // this.actionSheetCtrl.create({
    //   header: 'Choose an action',
    //   buttons: [
    //     {
    //       text: 'Riferimenti capitoli/paragrafi',
    //       handler: () => {
    //         console.log('non faccio niente');
    //       }
    //     },
    //     {
    //       text: 'Cancel',
    //       role: 'cancel'
    //     }
    //   ]
    // }).then(actionSheetEl => {
    //   actionSheetEl.present();
    // });
  }

  onShowArchived() {
    this.showArchived = !this.showArchived;
  }

  ngOnInit() {
    this.managementSrv.fetchUnits().pipe(take(1)).subscribe(newUnits => {
      for (let singleUnit of newUnits) {
        this.managementSrv.updateUnit(singleUnit).subscribe();
      }
    });
    this.unitsSub = this.managementSrv.unitlist.subscribe(units => {
      this.archivedUnits = units.filter(unit => unit.isArchived == true);
      let nonArchivedUnits = units.filter(unit => !this.archivedUnits.includes(unit));
      let futureUnits = nonArchivedUnits.filter(unit => unit.nextDate != undefined);
      console.log('ora le futureUnits non ordinate sono: ', futureUnits);
      futureUnits.sort((unitA, unitB) => (new Date(unitA.nextDate.giorno) < new Date(unitB.nextDate.giorno) ? -1 : 1));
      console.log('ora le futureUnits ordinate sono: ', futureUnits);
      this.todayUnits = futureUnits.filter(unit => new Date(unit.nextDate.giorno).setHours(12, 0, 0, 0) == new Date().setHours(12, 0, 0, 0));
      let tomorrowDate = new Date();
      tomorrowDate.setDate(tomorrowDate.getDate() + 1);
      let tomorrow = tomorrowDate.setHours(12, 0, 0, 0);
      this.tomorrowUnits = futureUnits.filter(unit => new Date(unit.nextDate.giorno).setHours(12, 0, 0, 0) == tomorrow);
      this.nextDaysUnits = futureUnits.filter(unit => !this.todayUnits.includes(unit) && !this.tomorrowUnits.includes(unit));
      this.pastDatesUnits = nonArchivedUnits.filter(unit => unit.nextDate == undefined);
      this.pastDatesUnits.sort((unitA, unitB) => (unitA.appuntamenti[unitA.appuntamenti.length - 1].giorno > unitB.appuntamenti[unitB.appuntamenti.length - 1].giorno) ? -1 : 1);
      this.archivedUnits.sort((unitA, unitB) => (unitA.appuntamenti[unitA.appuntamenti.length - 1].giorno > unitB.appuntamenti[unitB.appuntamenti.length - 1].giorno) ? -1 : 1);
      console.log('futureUnits ordinati sono: ', futureUnits);
      console.log('pastDatesUnits ordinati sono: ', this.pastDatesUnits);
      // this.unitList = units;
      this.unitList = [...futureUnits, ...this.pastDatesUnits];
    })

    // this.unitsSub = this.managementSrv.fetchUnits().subscribe(units => {
    //   let futureUnits = units.filter(unit => unit.nextDate != undefined);
    //   futureUnits.sort((unitA, unitB) => (unitA.nextDate < unitB.nextDate ? 1 : -1));
    //   this.pastDatesUnits = units.filter(unit => unit.nextDate == undefined);
    //   this.pastDatesUnits.sort((unitA, unitB) => (unitA.appuntamenti[unitA.appuntamenti.length - 1].giorno > unitB.appuntamenti[unitB.appuntamenti.length - 1].giorno) ? -1 : 1);
    //   console.log('futureUnits ordinati sono: ', futureUnits);
    //   console.log('pastDatesUnits ordinati sono: ', this.pastDatesUnits);
    //   this.unitList = units;
    // })

    // this.unitsSub = this.managementSrv.unitlist.subscribe(units => {
    // })

    // this.unitList = this.managementSrv.unitlist;
  }

  // ionViewWillEnter() {
  //   this.managementSrv.fetchUnits().
  //     subscribe();
  // }

  ngOnDestroy() {
    if (this.unitsSub) {
      this.unitsSub.unsubscribe();
    };
    if (this.userIdTokenSub) {
      this.userIdTokenSub.unsubscribe();
    }
  }

}
