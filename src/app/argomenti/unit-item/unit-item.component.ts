import { Component, OnInit, Input } from '@angular/core';
import { UnitComponent } from 'src/app/unit/unit.component';
import { ManagementService } from 'src/app/management.service';
import { UnitsData } from 'src/app/units-data';
import { AlertController, IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-unit-item',
  templateUrl: './unit-item.component.html',
  styleUrls: ['./unit-item.component.scss'],
})
export class UnitItemComponent implements OnInit {

  @Input() unitItem: UnitComponent;

  constructor(private managementSrv: ManagementService, private alertCtrl: AlertController) { }

  onArchive() {
    console.log("Archiving unit", this.unitItem.title);
    if (this.unitItem.isArchived != undefined) {
      this.unitItem.isArchived = !this.unitItem.isArchived;
    } else {
      this.unitItem.isArchived = true;
    }
    this.managementSrv.updateUnit(this.unitItem).subscribe((res: UnitsData) => {
      this.unitItem = new UnitComponent(this.unitItem.id, res.title, res.libro, res.chapterFrom, res.chapterTo, new Date(res.createdOn), res.appuntamenti, res.notes, res.questions, res.isArchived);
    });
  }

  onDelete(slidingItem: IonItemSliding) {
    console.log("Deleting unit ", this.unitItem.title);
    // this.managementSrv.deleteUnit(this.unitItem)
    this.alertCtrl.create({
      header: 'Confirm delete?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            slidingItem.close();
          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('Deleting unit!');
            this.managementSrv.deleteUnit(this.unitItem).subscribe(res => {
              console.log('Deletion completed');
            })
          }
        }
      ]
    }).then(el => {
      el.present();
    });
  }

  ngOnInit() { }

}
