import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ManagementService } from '../management.service';
import { ModalController } from '@ionic/angular';
var NewUnitComponent = /** @class */ (function () {
    function NewUnitComponent(managementSrv, modalCtrl) {
        this.managementSrv = managementSrv;
        this.modalCtrl = modalCtrl;
    }
    NewUnitComponent.prototype.onCreateUnit = function (form) {
        this.managementSrv.addUnit(form);
        this.modalCtrl.dismiss();
    };
    NewUnitComponent.prototype.ngOnInit = function () {
        this._books = this.managementSrv.books;
        console.log('i books nella new-unit component sono: ', this._books);
    };
    NewUnitComponent = tslib_1.__decorate([
        Component({
            selector: 'app-new-unit',
            templateUrl: './new-unit.component.html',
            styleUrls: ['./new-unit.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ManagementService, ModalController])
    ], NewUnitComponent);
    return NewUnitComponent;
}());
export { NewUnitComponent };
//# sourceMappingURL=new-unit.component.js.map