import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { ManagementService } from '../management.service';
import { NewBookComponent } from '../new-book/new-book.component';
import { NewUnitComponent } from '../new-unit/new-unit.component';
import { UnitComponent } from '../unit/unit.component';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators/';

@Component({
  selector: 'app-argomenti',
  templateUrl: './argomenti.page.html',
  styleUrls: ['./argomenti.page.scss'],
})
export class ArgomentiPage implements OnInit, OnDestroy {
  private unitList: UnitComponent[];
  private futureDatesUnits: UnitComponent[];
  private pastDatesUnits: UnitComponent[];
  private unitsSub: Subscription;

  constructor(private modalCtrl: ModalController, private actionSheetCtrl: ActionSheetController, private managementSrv: ManagementService) { }

  onShowConsole() {
    console.log('Bottone cliccato!');
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

  ngOnInit() {
    this.managementSrv.fetchUnits().subscribe(newUnits => {
      for (let singleUnit of newUnits) {
        this.managementSrv.updateUnit(singleUnit).subscribe();
      }
    });
    this.unitsSub = this.managementSrv.unitlist.subscribe(units => {
      let futureUnits = units.filter(unit => unit.nextDate != undefined);
      console.log('ora le futureUnits non ordinate sono: ', futureUnits);
      futureUnits.sort((unitA, unitB) => (new Date(unitA.nextDate.giorno) < new Date(unitB.nextDate.giorno) ? -1 : 1));
      console.log('ora le futureUnits ordinate sono: ', futureUnits);
      this.pastDatesUnits = units.filter(unit => unit.nextDate == undefined);
      this.pastDatesUnits.sort((unitA, unitB) => (unitA.appuntamenti[unitA.appuntamenti.length - 1].giorno > unitB.appuntamenti[unitB.appuntamenti.length - 1].giorno) ? -1 : 1);
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
    }
  }

}
