import * as tslib_1 from "tslib";
import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { NavigationPage } from './navigation.page';
// import { ArgomentiPageModule } from '../argomenti/argomenti.module';
// import { CalendarioPageModule } from '../calendario/calendario.module';
var routes = [
    {
        path: 'tabs',
        component: NavigationPage,
        children: [
            {
                path: 'args',
                children: [
                    {
                        path: '',
                        loadChildren: '../argomenti/argomenti.module#ArgomentiPageModule'
                    },
                    {
                        path: ':unitName',
                        loadChildren: '../unit-detail/unit-detail.module#UnitDetailPageModule'
                    }
                ]
            },
            {
                path: 'calendar',
                children: [
                    {
                        path: '',
                        loadChildren: '../calendario/calendario.module#CalendarioPageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/navigation/tabs/args',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/navigation/tabs/args',
        pathMatch: 'full'
    }
];
var NavigationRoutingModule = /** @class */ (function () {
    function NavigationRoutingModule() {
    }
    NavigationRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], NavigationRoutingModule);
    return NavigationRoutingModule;
}());
export { NavigationRoutingModule };
//# sourceMappingURL=navigation-routing.module.js.map