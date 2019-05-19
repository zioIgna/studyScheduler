import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { NavigationPage } from './navigation.page';
import { NavigationRoutingModule } from './navigation-routing.module';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    NavigationRoutingModule
  ],
  declarations: [NavigationPage]
})
export class NavigationPageModule {}
