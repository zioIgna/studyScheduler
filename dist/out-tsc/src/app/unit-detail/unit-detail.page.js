import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ManagementService } from '../management.service';
import { ActivatedRoute } from '@angular/router';
import { DeadlineStatus } from '../deadlineStatus.model';
var UnitDetailPage = /** @class */ (function () {
    function UnitDetailPage(managementSrv, route) {
        // private route: ActivatedRouteSnapshot;
        this.managementSrv = managementSrv;
        this.route = route;
    }
    UnitDetailPage.prototype.onSwitchStatus = function (giorno) {
        // console.log('il giorno da modificare è: ', giorno);
        var index = this.unit.appuntamenti.findIndex(function (app) { return app.giorno == giorno; });
        var myApp = this.unit.appuntamenti[index];
        var myStatus = myApp.status;
        if (myApp.giorno.getTime() <= new Date().getTime()) {
            if (myStatus == DeadlineStatus.Overdue) {
                // myStatus = DeadlineStatus.Done;
                console.log('lo status è overdue');
                myApp.status = DeadlineStatus.Done;
                // console.log('ora myStatus è: ', myStatus);
            }
            else if (myStatus == DeadlineStatus.Done) {
                console.log('lo status è done');
                myApp.status = DeadlineStatus.Overdue;
                // myStatus = DeadlineStatus.Overdue;
            }
            // myStatus = myStatus == 'OVERDUE' ? DeadlineStatus.Done : DeadlineStatus.Overdue;
            // console.log('myStatus = ', myStatus);
            if (this.unit.pastDates.findIndex(function (pastDate) {
                console.log('questo pastDate è: ', pastDate);
                return pastDate.status == DeadlineStatus.Overdue;
            }) > -1) {
                this.unit.overdueDates = true;
            }
            else {
                this.unit.overdueDates = false;
            }
            ;
            this.managementSrv.updateUnit(this.unit);
            console.log('dopo switchstatus, la unit è: ', this.unit);
        }
    };
    UnitDetailPage.prototype.ngOnInit = function () {
        var _this = this;
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
        this.managementSrv.getUnit(this.unitName).subscribe(function (myUnit) {
            _this.unit = myUnit;
        });
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
    };
    UnitDetailPage.prototype.ngOnDestroy = function () {
        if (this.unitSubscription) {
            this.unitSubscription.unsubscribe();
        }
    };
    UnitDetailPage = tslib_1.__decorate([
        Component({
            selector: 'app-unit-detail',
            templateUrl: './unit-detail.page.html',
            styleUrls: ['./unit-detail.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ManagementService, ActivatedRoute])
    ], UnitDetailPage);
    return UnitDetailPage;
}());
export { UnitDetailPage };
//# sourceMappingURL=unit-detail.page.js.map