import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ManagementService } from '../management.service';
import { ModalController } from '@ionic/angular';
var NewBookComponent = /** @class */ (function () {
    function NewBookComponent(managementSrv, modalCtrl) {
        this.managementSrv = managementSrv;
        this.modalCtrl = modalCtrl;
    }
    NewBookComponent.prototype.onCreateBook = function (form) {
        this.managementSrv.addBook(form);
        this.modalCtrl.dismiss();
    };
    NewBookComponent.prototype.ngOnInit = function () { };
    NewBookComponent = tslib_1.__decorate([
        Component({
            selector: 'app-new-book',
            templateUrl: './new-book.component.html',
            styleUrls: ['./new-book.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ManagementService, ModalController])
    ], NewBookComponent);
    return NewBookComponent;
}());
export { NewBookComponent };
//# sourceMappingURL=new-book.component.js.map