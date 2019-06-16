import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { ManagementService } from '../management.service';
import { NewBookComponent } from '../new-book/new-book.component';
import { NewUnitComponent } from '../new-unit/new-unit.component';
var ArgomentiPage = /** @class */ (function () {
    function ArgomentiPage(modalCtrl, actionSheetCtrl, managementSrv) {
        this.modalCtrl = modalCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.managementSrv = managementSrv;
    }
    ArgomentiPage.prototype.onShowConsole = function () {
        console.log('Bottone cliccato!');
    };
    ArgomentiPage.prototype.onAddBook = function () {
        this.modalCtrl.create({
            component: NewBookComponent
        }).then(function (modalEl) {
            modalEl.present();
            return modalEl.onDidDismiss();
        });
        console.log('Aggiunto libro');
        // this.managementSrv.books.push({
        //   autore: "nuovo arrivato",
        //   pagine: 40,
        //   titolo: "un titolo a caso"
        // });
        // console.log('questi sono i libri:', this.managementSrv.books);
        // console.log('questa è la mia proprieta: ', this.managementSrv.myProp);
    };
    ArgomentiPage.prototype.onAddUnita = function () {
        this.modalCtrl.create({
            component: NewUnitComponent
        }).then(function (modalEl) {
            modalEl.present();
            return modalEl.onDidDismiss();
        });
        // this.actionSheetCtrl.create({
        //   header: 'Choose an action',
        //   buttons: [
        //     {
        //       text: 'Riferimenti capitoli/paragrafi',
        //       handler: () => {
        //         console.log('non faccio niente');
        //       }
        //     },
        //     {
        //       text: 'Cancel',
        //       role: 'cancel'
        //     }
        //   ]
        // }).then(actionSheetEl => {
        //   actionSheetEl.present();
        // });
    };
    ArgomentiPage.prototype.onSwitchStatus = function () {
        console.log('bottone cliccato!');
    };
    ArgomentiPage.prototype.ngOnInit = function () {
        var _this = this;
        this.unitsSub = this.managementSrv.fetchUnits().subscribe(function (units) {
            var futureUnits = units.filter(function (unit) { return unit.nextDate != undefined; });
            futureUnits.sort(function (unitA, unitB) { return (unitA.nextDate < unitB.nextDate ? 1 : -1); });
            _this.pastDatesUnits = units.filter(function (unit) { return unit.nextDate == undefined; });
            _this.pastDatesUnits.sort(function (unitA, unitB) { return (unitA.appuntamenti[unitA.appuntamenti.length - 1].giorno > unitB.appuntamenti[unitB.appuntamenti.length - 1].giorno) ? -1 : 1; });
            console.log('futureUnits ordinati sono: ', futureUnits);
            console.log('pastDatesUnits ordinati sono: ', _this.pastDatesUnits);
            _this.unitList = units;
        });
        // this.unitsSub = this.managementSrv.unitlist.subscribe(units => {
        // })
        // this.unitList = this.managementSrv.unitlist;
    };
    ArgomentiPage.prototype.ngOnDestroy = function () {
        if (this.unitsSub) {
            this.unitsSub.unsubscribe();
        }
    };
    ArgomentiPage = tslib_1.__decorate([
        Component({
            selector: 'app-argomenti',
            templateUrl: './argomenti.page.html',
            styleUrls: ['./argomenti.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController, ActionSheetController, ManagementService])
    ], ArgomentiPage);
    return ArgomentiPage;
}());
export { ArgomentiPage };
//# sourceMappingURL=argomenti.page.js.map