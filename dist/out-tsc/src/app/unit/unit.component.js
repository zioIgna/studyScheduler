import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
var UnitComponent = /** @class */ (function () {
    function UnitComponent(id, title, libro, chapterFrom, chapterTo, createdOn, appuntamenti) {
        this.id = id;
        this.title = title;
        this.libro = libro;
        this.chapterFrom = chapterFrom;
        this.chapterTo = chapterTo;
        this.createdOn = createdOn;
        this.appuntamenti = appuntamenti;
        var today = new Date();
        this.nextDate = appuntamenti.find(function (appuntamento) {
            var res = appuntamento.giorno.getTime() - today.getTime() >= 0;
            console.log('res = ', res);
            return res;
        });
        // this.pastDates.splice(0, 0, ...(appuntamenti.filter(app => {
        //   return app.giorno.getTime() < this.today.getTime();
        //   console.log('app.giorno.getTime() è: ', app.giorno.getTime());
        //   console.log('i pastDates sono: ', this.pastDates);
        // })));
        this.pastDates = appuntamenti.filter(function (app) {
            // console.log('app.giorno.getTime() = ', app.giorno.getTime());
            return app.giorno.getTime() < new Date().getTime();
        });
        console.log('pastDates ora sono: ', this.pastDates);
        this.overdueDates = (this.pastDates.findIndex(function (date) {
            return date.status == 'OVERDUE';
        }) >= 0);
        console.log('nel constructor gli appuntamenti sono: ', appuntamenti);
        console.log('nextDate = ', this.nextDate);
        console.log('overdueDates è: ', this.overdueDates);
    }
    UnitComponent = tslib_1.__decorate([
        Component({
            selector: 'app-unit',
            templateUrl: './unit.component.html',
            styleUrls: ['./unit.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [String, String, String, String, String, Date, Array])
    ], UnitComponent);
    return UnitComponent;
}());
export { UnitComponent };
//# sourceMappingURL=unit.component.js.map