import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    IonicModule,
    // HomeRoutingModule
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
