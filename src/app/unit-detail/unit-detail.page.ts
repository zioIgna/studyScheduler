import { Component, OnInit, OnDestroy } from '@angular/core';
import { UnitComponent } from '../unit/unit.component';
import { ManagementService } from '../management.service';
import { ActivatedRoute } from '@angular/router';
import { DeadlineStatus } from '../deadlineStatus.model';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-unit-detail',
  templateUrl: './unit-detail.page.html',
  styleUrls: ['./unit-detail.page.scss'],
})
export class UnitDetailPage implements OnInit, OnDestroy {

  unitName: string;
  unit: UnitComponent;
  // private _unit = new Subject<UnitComponent>();
  private unitSubscription: Subscription;

  constructor(private managementSrv: ManagementService, private route: ActivatedRoute) {
    // private route: ActivatedRouteSnapshot;

  }

  onSwitchStatus(giorno: Date) {
    // console.log('il giorno da modificare è: ', giorno);
    let index = this.unit.appuntamenti.findIndex(app => app.giorno == giorno);
    let myApp = this.unit.appuntamenti[index];
    let myStatus = myApp.status;
    if (new Date(myApp.giorno).getTime() <= new Date().getTime()) {
      if (myStatus == DeadlineStatus.Overdue) {
        // myStatus = DeadlineStatus.Done;
        console.log('lo status è overdue');
        myApp.status = DeadlineStatus.Done;
        // console.log('ora myStatus è: ', myStatus);
      } else if (myStatus == DeadlineStatus.Done) {
        console.log('lo status è done');
        myApp.status = DeadlineStatus.Overdue;
        // myStatus = DeadlineStatus.Overdue;
      }
      // myStatus = myStatus == 'OVERDUE' ? DeadlineStatus.Done : DeadlineStatus.Overdue;
      // console.log('myStatus = ', myStatus);
      if (this.unit.pastDates.findIndex(pastDate => {
        console.log('questo pastDate è: ', pastDate);
        return pastDate.status == DeadlineStatus.Overdue;
      }) > -1){
        this.unit.overdueDates = true;
      } else {
        this.unit.overdueDates = false;
      };
      this.managementSrv.updateUnit(this.unit);
      console.log('dopo switchstatus, la unit è: ', this.unit);
    }
  }

  ngOnInit() {

    this.unitName = this.route.snapshot.params['unitName'];
    console.log('unitName: ', this.unitName);
    // this.managementSrv.getUnit(this.unitName).subscribe(myUnit => {
    //   this.unit = new UnitComponent(
    //     myUnit.title,
    //     myUnit.libro,
    //     myUnit.chapterFrom,
    //     myUnit.chapterTo,
    //     myUnit.createdOn,
    //     myUnit.appuntamenti
    //   );
    //   this.unit.nextDate = myUnit.nextDate;
    //   this.unit.overdueDates = myUnit.overdueDates;
    //   this.unit.pastDates = myUnit.pastDates;
    //   this.unit.today = myUnit.today;
    // });
    this.managementSrv.getUnit(this.unitName).subscribe(myUnit => {
      this.unit = myUnit;
    })

    // this.unit = this.managementSrv.getUnit(this.unitName);

    // this.route.queryParams.subscribe(params => {
    //   console.log('params: ', params);
    // });

    // this.route.queryParams.subscribe(params => {
    //   console.log('params: ', params);
    //   let unitName = params.unitName;
    //   this.unit = this.managementSrv.getUnit(unitName);
    //   console.log('la unità è: ', this.unit);
    // });
  }

  ngOnDestroy() {
    if (this.unitSubscription) {
      this.unitSubscription.unsubscribe();
    }
  }

}
