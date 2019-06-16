import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UnitDetailPage } from './unit-detail.page';
var routes = [
    {
        path: '',
        component: UnitDetailPage
    }
];
var UnitDetailPageModule = /** @class */ (function () {
    function UnitDetailPageModule() {
    }
    UnitDetailPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [UnitDetailPage]
        })
    ], UnitDetailPageModule);
    return UnitDetailPageModule;
}());
export { UnitDetailPageModule };
//# sourceMappingURL=unit-detail.module.js.map