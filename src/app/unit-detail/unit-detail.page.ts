import { Component, OnInit, OnDestroy } from '@angular/core';
import { UnitComponent } from '../unit/unit.component';
import { ManagementService } from '../management.service';
import { ActivatedRoute } from '@angular/router';
import { DeadlineStatus } from '../deadlineStatus.model';
import { Subscription, Subject } from 'rxjs';
import { UnitsData } from '../units-data';
import { HttpClient } from '@angular/common/http';

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

  constructor(private managementSrv: ManagementService, private route: ActivatedRoute, private http: HttpClient) {
    // private route: ActivatedRouteSnapshot;

  }

  onSwitchStatus(giorno: Date) {
    // console.log('il giorno da modificare è: ', giorno);
    let index = this.unit.appuntamenti.findIndex(app => app.giorno == giorno);
    let myApp = this.unit.appuntamenti[index];
    let myStatus = myApp.status;
    if (this.pastDate(new Date(myApp.giorno))) {
      // if (new Date(myApp.giorno).getTime() <= new Date().getTime()) {
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
      // if (this.unit.pastDates.findIndex(pastDate => {
      //   console.log('questo pastDate è: ', pastDate);
      //   return pastDate.status == DeadlineStatus.Overdue;
      // }) > -1) {
      //   this.unit.overdueDates = true;
      // } else {
      //   this.unit.overdueDates = false;
      // };
      this.managementSrv.updateUnit(this.unit).subscribe((res: UnitsData) => {
        this.unit = new UnitComponent(this.unit.id, res.title, res.libro, res.chapterFrom, res.chapterTo, new Date(res.createdOn), res.appuntamenti);
      });
      console.log('dopo switchstatus, la unit è: ', this.unit);
    } else if (this.sameDay(new Date(myApp.giorno))) {
      console.log('è lo stesso giorno');
      if (myStatus == DeadlineStatus.Due) {
        myApp.status = DeadlineStatus.Done;
      } else {
        myApp.status = DeadlineStatus.Due;
      }
      console.log('sto passando questa unit allo update: ', this.unit);
      this.managementSrv.updateUnit(this.unit).subscribe((res: UnitsData) => {
        this.unit = new UnitComponent(this.unit.id, res.title, res.libro, res.chapterFrom, res.chapterTo, new Date(res.createdOn), res.appuntamenti);
      });
    }
  }

  pastDate(date1: Date): boolean {
    let today = new Date();
    let newDate1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    let newDate2 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
    return (newDate1 - newDate2) < 0;
    // var ms = Math.abs(newDate1 - newDate2);
    // return Math.floor(ms / 1000 / 60 / 60 / 24) == 0;
  }

  sameDay(date1: Date): boolean {
    let today = new Date();
    let newDate1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    let newDate2 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
    var ms = Math.abs(newDate1 - newDate2);
    return Math.floor(ms / 1000 / 60 / 60 / 24) == 0;
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
