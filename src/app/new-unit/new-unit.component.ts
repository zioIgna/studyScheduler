import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ManagementService } from '../management.service';
import { Book } from '../Book';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-unit',
  templateUrl: './new-unit.component.html',
  styleUrls: ['./new-unit.component.scss'],
})
export class NewUnitComponent implements OnInit, OnDestroy {

  private _books: Book[];
  private booksSub: Subscription;

  constructor(private managementSrv: ManagementService, private modalCtrl: ModalController) { }

  onCreateUnit(form: NgForm) {
    this.managementSrv.addUnit(form);
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
    // this._books = this.managementSrv.books;
    this.managementSrv.fetchBooks().subscribe(res => {
      this._books = res;
    });
    this.booksSub = this.managementSrv.books.subscribe(res => {
      this._books = res;
    })
    // console.log('i books nella new-unit component sono: ', this._books);
  }

  ngOnDestroy() {
    if (this.booksSub) {
      this.booksSub.unsubscribe();
    }
  }

}
