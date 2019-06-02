import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { ManagementService } from '../management.service';
import { NewBookComponent } from '../new-book/new-book.component';
import { NewUnitComponent } from '../new-unit/new-unit.component';
import { UnitComponent } from '../unit/unit.component';

@Component({
  selector: 'app-argomenti',
  templateUrl: './argomenti.page.html',
  styleUrls: ['./argomenti.page.scss'],
})
export class ArgomentiPage implements OnInit {
  private unitList: UnitComponent[];

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
    }).then(modalEl =>{
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

  onSwitchStatus(){
    console.log('bottone cliccato!');
  }

  ngOnInit() {
    this.unitList = this.managementSrv.unitlist;
  }

}
