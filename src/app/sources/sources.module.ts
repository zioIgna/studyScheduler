import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SourcesPage } from './sources.page';
import { EditBookComponent } from '../argomenti/edit-book/edit-book.component';

const routes: Routes = [
  {
    path: '',
    component: SourcesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SourcesPage, EditBookComponent],
  entryComponents: [EditBookComponent]
})
export class SourcesPageModule {}
