import { Component, OnInit, OnDestroy } from '@angular/core';
import { UnitComponent } from '../unit/unit.component';
import { ManagementService } from '../management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeadlineStatus } from '../deadlineStatus.model';
import { Subscription, Subject } from 'rxjs';
import { UnitsData } from '../units-data';
import { HttpClient } from '@angular/common/http';
import { difficultyLevel } from '../difficultyLevel';

@Component({
  selector: 'app-unit-detail',
  templateUrl: './unit-detail.page.html',
  styleUrls: ['./unit-detail.page.scss'],
})
export class UnitDetailPage implements OnInit, OnDestroy {

  unitName: string;
  unitId: string;
  unit: UnitComponent;
  private unitSubscription: Subscription;
  constructor(private managementSrv: ManagementService, private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  onSwitchStatus(giorno: Date) {
    let index = this.unit.appuntamenti.findIndex(app => app.giorno == giorno);
    let myApp = this.unit.appuntamenti[index];
    let myStatus = myApp.status;
    if (this.pastDate(new Date(myApp.giorno))) {
      if (myStatus == DeadlineStatus.Overdue) {
        console.log('lo status è overdue');
        myApp.status = DeadlineStatus.Done;
      } else if (myStatus == DeadlineStatus.Done) {
        console.log('lo status è done');
        myApp.status = DeadlineStatus.Overdue;
      }
      this.managementSrv.updateUnit(this.unit).subscribe((res: UnitsData) => {
        this.unit = new UnitComponent(this.unit.id, res.title, res.libro, res.chapterFrom, res.chapterTo, new Date(res.createdOn), res.appuntamenti, res.notes, res.questions, res.isArchived);
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
        this.unit = new UnitComponent(this.unit.id, res.title, res.libro, res.chapterFrom, res.chapterTo, new Date(res.createdOn), res.appuntamenti, res.notes, res.questions, res.isArchived);
      });
    }
  }

  onSwitchDifficulty(index: number) {
    let diffLev = this.unit.questions[index].difficulty;
    console.log('il diffLev è: ', diffLev);
    diffLev == difficultyLevel.easy ? diffLev = difficultyLevel.medium : diffLev == difficultyLevel.medium ? diffLev = difficultyLevel.hard : diffLev = difficultyLevel.easy;
    this.unit.questions[index].difficulty = diffLev;
    console.log('il diffLev è: ', diffLev);
    this.managementSrv.updateUnit(this.unit).subscribe((res: UnitsData) => {
      this.unit = new UnitComponent(this.unit.id, res.title, res.libro, res.chapterFrom, res.chapterTo, new Date(res.createdOn), res.appuntamenti, res.notes, res.questions, res.isArchived);
    });
  }

  pastDate(date1: Date): boolean {
    let today = new Date();
    today.setHours(12, 0, 0, 0);
    date1.setHours(12, 0, 0, 0);
    return date1 < today;
  }

  sameDay(date1: Date): boolean {
    let today = new Date();
    today.setHours(12, 0, 0, 0);
    date1.setHours(12, 0, 0, 0);
    return today.getTime() == date1.getTime();
  }

  ngOnInit() {
    // this.unitName = this.route.snapshot.params['unitName'];
    this.unitId = this.route.snapshot.params['unitId'];
    // console.log('unitName: ', this.unitName);
    console.log('unitId: ', this.unitId);
    // this.managementSrv.getUnit(this.unitName).subscribe(myUnit => {
    //   this.unit = myUnit;
    // })
    this.unitSubscription = this.managementSrv.getUnitById(this.unitId).subscribe(myUnit => {
      this.unit = myUnit;
    })
    this.managementSrv.unitlist.subscribe(units => {
      this.unit = units.find(newUnit => newUnit.id == this.unitId);
    });
  }

  ngOnDestroy() {
    if (this.unitSubscription) {
      this.unitSubscription.unsubscribe();
    }
  }
}
