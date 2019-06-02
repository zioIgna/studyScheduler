import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ManagementService } from '../management.service';
import { Book } from '../Book';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-new-unit',
  templateUrl: './new-unit.component.html',
  styleUrls: ['./new-unit.component.scss'],
})
export class NewUnitComponent implements OnInit {

  private _books: Book[];

  constructor(private managementSrv: ManagementService, private modalCtrl: ModalController) { }

  onCreateUnit(form: NgForm){
    this.managementSrv.addUnit(form);
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
    this._books = this.managementSrv.books;
    console.log('i books nella new-unit component sono: ', this._books);
  }

}
