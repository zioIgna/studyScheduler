import { Component, OnInit } from '@angular/core';
import { UnitComponent } from '../unit/unit.component';
import { ManagementService } from '../management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IonRadioGroup, AlertController } from '@ionic/angular';
import { DeadlineStatus } from '../deadlineStatus.model';

@Component({
  selector: 'app-reschedule-unit',
  templateUrl: './reschedule-unit.page.html',
  styleUrls: ['./reschedule-unit.page.scss'],
})
export class RescheduleUnitPage implements OnInit {

  unit: UnitComponent;
  unitId: string;
  selectedValue: number;
  newDateStr: string;
  // minimunDate = Date();
  // minimumYear: number;

  constructor(
    private managementSrv: ManagementService,
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private router: Router) { }

  ngOnInit() {
    this.unitId = this.route.snapshot.params['unitId'];
    console.log('unitId: ', this.unitId);
    this.managementSrv.getUnitById(this.unitId).subscribe(myUnit => {
      console.log('Nello edit, myUnit = ', myUnit);
      this.unit = myUnit;
      // this.minimunDate = myUnit.appuntamenti[0].giorno;
      // this.minimumYear = myUnit.appuntamenti[0].giorno.getUTCFullYear();
    });
  }



  // checkSelectedValue() {
  //   return !!this.selectedValue;
  // }

  isValidNewDate(shiftingDate: Date, newDate: string) {
    return shiftingDate < new Date(newDate);
  }

  addDays(currDate: Date, days: number) {
    var date = new Date(currDate);
    date.setDate(date.getDate() + days);
    return date;
  }

  onUpdateDeadlines() {
    console.log('Il valore selezionato è: ', this.selectedValue);
    console.log('La nuova data è: ', this.newDateStr);
    let shiftingDate = new Date(this.unit.appuntamenti[this.selectedValue].giorno);
    shiftingDate.setHours(12, 0, 0, 0);
    // let newDateNumber = Date.UTC(new Date(this.newDateStr).getFullYear(), new Date(this.newDateStr).getMonth(), new Date(this.newDateStr).getDate());
    // let newDate = new Date(newDateNumber);
    let newDate = new Date(
      new Date(this.newDateStr).getFullYear(),
      new Date(this.newDateStr).getMonth(),
      new Date(this.newDateStr).getDate(),
      12, 0, 0, 0
    );
    if (shiftingDate >= newDate) {
      let message = 'The new date must be greater than the selected one';
      this.showAlert(message);
      console.log('La nuova data non è valida', newDate);
    } else {
      let today = new Date();
      let daysDiff = (newDate.getTime() - shiftingDate.getTime()) / (1000 * 3600 * 24);
      for (let i = this.selectedValue; i < this.unit.appuntamenti.length; i++) {
        let currDate = this.unit.appuntamenti[i].giorno;
        let updDate = this.addDays(currDate, daysDiff);
        this.unit.appuntamenti[i].giorno = updDate;
        console.log('valore del nuovo appuntamento: ', this.unit.appuntamenti[i].giorno);
        if(updDate > today){
          this.unit.appuntamenti[i].status = DeadlineStatus.Due;
          console.log('status del nuovo appuntamento: ', this.unit.appuntamenti[i].status);
        }
      }
      this.managementSrv.rescheduleDates(this.unit.id, this.unit.appuntamenti).subscribe(
        res => {
          console.log("Allo edit della untià ho ottenuto: ", res);
          this.router.navigate(['/navigation/tabs/args', this.unitId]);
        },
        err => {
          console.log('Aggiornamento non riuscito, ', err);
          this.router.navigate(['/navigation/tabs/args', this.unitId]);
        }
      );

    }
  }

  onResetDeadlines() {
    this.alertCtrl.create({
      header: 'Confirm reset?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: () => {
            console.log('Valori resettati!');
            this.managementSrv.resetDates(this.unit).subscribe(res => {
              console.log('eseguito il reset');
              this.router.navigate(['/navigation/tabs/args', this.unitId]);
            })
          }
        }
      ]
    }).then(el => {
      el.present();
    });
  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'Selection failed',
        message: message,
        buttons: ['Okay']
      })
      .then(alertEl => alertEl.present());
  }

}
