import { Component, OnInit } from '@angular/core';
import { UnitComponent } from '../unit/unit.component';
import { ManagementService } from '../management.service';
import { ActivatedRoute } from '@angular/router';
import { IonRadioGroup } from '@ionic/angular';

@Component({
  selector: 'app-reschedule-unit',
  templateUrl: './reschedule-unit.page.html',
  styleUrls: ['./reschedule-unit.page.scss'],
})
export class RescheduleUnitPage implements OnInit {

  unit: UnitComponent;
  unitId: string;
  selectedValue: number;
  newDate: Date;
  // minimunDate = Date();
  // minimumYear: number;

  constructor(private managementSrv: ManagementService, private route: ActivatedRoute) { }

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



  checkSelectedValue() {
    return !!this.selectedValue;
  }

  showValue() {
    console.log('Il valore selezionato è: ', this.selectedValue);
  }

}
