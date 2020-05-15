import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../auth/authentication.service';
import { AlertController } from '@ionic/angular';
import { tap, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-customization',
  templateUrl: './customization.page.html',
  styleUrls: ['./customization.page.scss'],
})
export class CustomizationPage implements OnInit, OnDestroy {

  // private actualDeadlines: number[] = [2, 5, 7];
  private actualDeadlines: number[];
  private updDeadlines: number[];
  private deadlines: number[];
  private newDeadline: number;
  private deadlineSub: Subscription;
  private editMode = false;
  private isLoading = true;


  constructor(private authSrv: AuthenticationService, private alertCtrl: AlertController) { }

  onSwitchEdit() {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.deadlines = this.updDeadlines;
    } else {
      this.deadlines = this.actualDeadlines;
      this.updDeadlines = [...this.actualDeadlines];
      this.newDeadline = null;
    }
  }

  onResetDeadlines() {
    console.log('Resetting deadlines...');
    this.alertCtrl.create({
      header: 'Confirm reset?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Reset',
          handler: () => {
            let userId;
            let userToken;
            console.log('Reset!');
            this.authSrv.userId.pipe(
              take(1),
              tap(res => userId = res),
              switchMap(() => { return this.authSrv.userIdToken }),
              take(1),
              tap(res => userToken = res),
              switchMap(() => { return this.authSrv.setStandardSettings(userId, userToken) }),
              take(1)
            ).subscribe(res => {
              console.log('Reset completed! ', res);
              this.updateDeadlines(res);
              //TODO: aggiungere il caso di errore nella risposta
            });
          }
        }
      ]
    }).then(el => {
      el.present();
    });
  }

  onAddDeadline() {
    if (this.newDeadline) {
      this.deadlines.push(this.newDeadline);
      this.newDeadline = null;
    }
  }

  onDeleteDeadline() {
    this.deadlines.pop();
  }

  onSubDay() {
    if (this.deadlines[0]) {
      this.deadlines[0]--;
    }
  }

  onAddDay() {
    if (this.deadlines[0] != undefined) {
      this.deadlines[0]++;
    }
  }

  onSave() {
    this.actualDeadlines = [...this.updDeadlines];
    this.editMode = false;
    this.newDeadline = null;
    this.authSrv.setCustomSettings(this.actualDeadlines).subscribe(res => {
      console.log('Salvati i nuovi settings');
    })
  }

  getVal(index: number) {
    let currArray;
    // if(this.editMode){
    //   currArray = 
    // }
    currArray = this.deadlines.slice(0, index + 1);
    return currArray.reduce((total, n) => total + n, 0);
  }

  ngOnInit() {
    this.deadlineSub = this.authSrv.fetchUserDeadlines().subscribe(
      res => {
        this.isLoading = false;
        this.updateDeadlines(res);
      },
      err => {
        this.isLoading = false;
        console.log('Data could not be fetched!');
      }
    )
  }

  updateDeadlines(deadlines: number[]) {
    if (deadlines) {
      this.actualDeadlines = deadlines;
    } else {
      this.actualDeadlines = [];
    }
    this.updDeadlines = [...this.actualDeadlines];
    this.deadlines = this.actualDeadlines;
  }

  ngOnDestroy(): void {
    if (this.deadlineSub) {
      this.deadlineSub.unsubscribe();
    }
  }

}
