import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ArgomentiPage } from './argomenti.page';
import { NewBookComponent } from '../new-book/new-book.component';
import { NewUnitComponent } from '../new-unit/new-unit.component';
var routes = [
    {
        path: '',
        component: ArgomentiPage
    }
];
var ArgomentiPageModule = /** @class */ (function () {
    function ArgomentiPageModule() {
    }
    ArgomentiPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ArgomentiPage, NewBookComponent, NewUnitComponent],
            entryComponents: [NewBookComponent, NewUnitComponent]
        })
    ], ArgomentiPageModule);
    return ArgomentiPageModule;
}());
export { ArgomentiPageModule };
//# sourceMappingURL=argomenti.module.js.map