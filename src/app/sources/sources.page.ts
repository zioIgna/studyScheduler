import { Component, OnInit } from '@angular/core';
import { Book } from '../Book';
import { ManagementService } from '../management.service';
import { Subscription } from 'rxjs';
import { ModalController, LoadingController } from '@ionic/angular';
import { EditBookComponent } from '../argomenti/edit-book/edit-book.component';

@Component({
  selector: 'app-sources',
  templateUrl: './sources.page.html',
  styleUrls: ['./sources.page.scss'],
})
export class SourcesPage implements OnInit {

  private _books: Book[];
  private booksSub: Subscription;

  constructor(private managementSrv: ManagementService, private modalCtrl: ModalController, private loadingCtrl: LoadingController,) { }

  ngOnInit() {
    this.managementSrv.fetchBooks().subscribe(res => {
      this._books = res;
    });
    this.booksSub = this.managementSrv.books.subscribe(res => {
      this._books = res;
    })
  }

  onEditBook(currBook: Book) {
    console.log('HO appena lanciato onEditBook()');
    this.modalCtrl.create({
      component: EditBookComponent,
      componentProps: {
        'book': currBook
      }
    }).then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    }).then(resultData => {
      this.loadingCtrl.create({ message: 'Editing book...' }).then(loadingEl => {
        loadingEl.present();
        const data = resultData.data.bookData;
        
      })
    })
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }


}
