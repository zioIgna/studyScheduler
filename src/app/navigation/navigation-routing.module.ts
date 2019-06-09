import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
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
                    children:
                        [
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
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NavigationRoutingModule { }