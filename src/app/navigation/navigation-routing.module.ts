import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "../auth/auth.guard";
import { NavigationPage } from './navigation.page';
// import { ArgomentiPageModule } from '../argomenti/argomenti.module';
// import { CalendarioPageModule } from '../calendario/calendario.module';

const routes: Routes = [
    {
        path: 'tabs',
        component: NavigationPage,
        children:
            [
                {
                    path: 'args',
                    children:
                        [
                            {
                                path: '',
                                loadChildren: '../argomenti/argomenti.module#ArgomentiPageModule',
                                // canLoad: [AuthGuard]
                            },
                            {
                                // path: ':unitName',
                                path: ':unitId',
                                children:
                                    [
                                        {
                                            path: 'edit',
                                            loadChildren: '../update-unit/update-unit.module#UpdateUnitPageModule'
                                        },
                                        {
                                            path: 'reschedule',
                                            loadChildren: '../reschedule-unit/reschedule-unit.module#RescheduleUnitPageModule'
                                        },
                                        {
                                            path: '',
                                            // redirectTo: '/navigation/tabs/args/:unitName',
                                            loadChildren: '../unit-detail/unit-detail.module#UnitDetailPageModule',
                                            canLoad: [AuthGuard]
                                            // pathMatch: 'full'
                                        }
                                    ],
                                // canLoad: [AuthGuard]
                            }
                        ]
                },
                {
                    path: 'calendar',
                    children:
                        [
                            {
                                path: '',
                                loadChildren: '../calendario/calendario.module#CalendarioPageModule',
                                // canLoad: [AuthGuard]
                            }
                        ]
                },
                {
                    path: 'settings',
                    children:
                        [
                            {
                                path: '',
                                loadChildren: '../customization/customization.module#CustomizationPageModule'
                            }
                        ]
                },
                {
                    path: 'sources',
                    children:
                        [
                            {
                                path: '',
                                loadChildren: '../sources/sources.module#SourcesPageModule'
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
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NavigationRoutingModule { }