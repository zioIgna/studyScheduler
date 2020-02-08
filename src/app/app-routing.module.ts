import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NavigationPage } from './navigation/navigation.page';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  // { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  // { path: 'argomenti', loadChildren: './argomenti/argomenti.module#ArgomentiPageModule' },
  // { path: 'calendario', loadChildren: './calendario/calendario.module#CalendarioPageModule' },
  { path: 'navigation', loadChildren: './navigation/navigation.module#NavigationPageModule' },
  // { path: 'unit-detail', loadChildren: './unit-detail/unit-detail.module#UnitDetailPageModule' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
