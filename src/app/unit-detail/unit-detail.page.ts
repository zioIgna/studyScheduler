import { Component, OnInit } from '@angular/core';
import { UnitComponent } from '../unit/unit.component';
import { ManagementService } from '../management.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-unit-detail',
  templateUrl: './unit-detail.page.html',
  styleUrls: ['./unit-detail.page.scss'],
})
export class UnitDetailPage implements OnInit {

  unitName: string;
  unit: UnitComponent;

  constructor(private managementSrv: ManagementService, private route: ActivatedRoute) {
    // private route: ActivatedRouteSnapshot;

  }

  ngOnInit() {

    this.unitName = this.route.snapshot.params['unitName'];
    console.log('unitName: ', this.unitName);
    this.unit = this.managementSrv.getUnit(this.unitName);

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

}
