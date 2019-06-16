import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
var routes = [
    { path: '', redirectTo: 'navigation', pathMatch: 'full' },
    { path: 'home', loadChildren: './home/home.module#HomePageModule' },
    { path: 'argomenti', loadChildren: './argomenti/argomenti.module#ArgomentiPageModule' },
    { path: 'calendario', loadChildren: './calendario/calendario.module#CalendarioPageModule' },
    { path: 'navigation', loadChildren: './navigation/navigation.module#NavigationPageModule' },
    { path: 'unit-detail', loadChildren: './unit-detail/unit-detail.module#UnitDetailPageModule' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map