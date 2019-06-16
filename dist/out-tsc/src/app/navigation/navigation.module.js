import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NavigationPage } from './navigation.page';
import { NavigationRoutingModule } from './navigation-routing.module';
var NavigationPageModule = /** @class */ (function () {
    function NavigationPageModule() {
    }
    NavigationPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                IonicModule,
                NavigationRoutingModule
            ],
            declarations: [NavigationPage]
        })
    ], NavigationPageModule);
    return NavigationPageModule;
}());
export { NavigationPageModule };
//# sourceMappingURL=navigation.module.js.map