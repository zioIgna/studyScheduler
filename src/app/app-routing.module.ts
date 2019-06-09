import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'navigation', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'argomenti', loadChildren: './argomenti/argomenti.module#ArgomentiPageModule' },
  { path: 'calendario', loadChildren: './calendario/calendario.module#CalendarioPageModule' },
  { path: 'navigation', loadChildren: './navigation/navigation.module#NavigationPageModule' },
  { path: 'unit-detail', loadChildren: './unit-detail/unit-detail.module#UnitDetailPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
