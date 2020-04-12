import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RescheduleUnitPage } from './reschedule-unit.page';

const routes: Routes = [
  {
    path: '',
    component: RescheduleUnitPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RescheduleUnitPage]
})
export class RescheduleUnitPageModule {}
