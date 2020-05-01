import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ArgomentiPage } from './argomenti.page';
import { NewBookComponent } from '../new-book/new-book.component';
import { NewUnitComponent } from '../new-unit/new-unit.component';
import { UnitItemComponent } from './unit-item/unit-item.component';

const routes: Routes = [
  {
    path: '',
    component: ArgomentiPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ArgomentiPage, NewBookComponent, NewUnitComponent, UnitItemComponent],
  entryComponents: [NewBookComponent, NewUnitComponent]
})
export class ArgomentiPageModule {}
