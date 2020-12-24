import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../Book';
import { ManagementService } from '../management.service';
import { Subscription } from 'rxjs';
import { ModalController, LoadingController, IonItemSliding, AlertController } from '@ionic/angular';
import { EditBookComponent } from '../argomenti/edit-book/edit-book.component';
import { IBookData } from '../ibook-data';

@Component({
  selector: 'app-sources',
  templateUrl: './sources.page.html',
  styleUrls: ['./sources.page.scss'],
})
export class SourcesPage implements OnInit, OnDestroy {

  private _books: Book[];
  private booksSub: Subscription;
  private archivedBooks: Book[];
  private nonArchivedBooks: Book[];
  private showArchived = false;

  constructor(private managementSrv: ManagementService, private modalCtrl: ModalController, private loadingCtrl: LoadingController, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.managementSrv.fetchBooks().subscribe(books => {
      this.getAndSortBooks(books);
    });
    this.booksSub = this.managementSrv.books.subscribe(books => {
      this.getAndSortBooks(books);
    })
  }

  getAndSortBooks(books: Book[]) {
    this._books = books;
    this.archivedBooks = this._books.filter(book => book.isArchived == true);
    this.nonArchivedBooks = this._books.filter(book => book.isArchived == undefined || book.isArchived == false);
    this.archivedBooks.sort((a, b) => a.titolo > b.titolo ? 1 : -1);
    this.nonArchivedBooks.sort((a, b) => a.titolo > b.titolo ? 1 : -1);
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
      this.loadingCtrl
        .create({ message: 'Editing book...' })
        .then(loadingEl => {
          loadingEl.present();
          if (resultData && resultData.data && resultData.data.bookData) {
            const data: IBookData = resultData.data.bookData;
            console.log("Ricevuti i dati: ", data);
            this.managementSrv.editSource(currBook.id, data).subscribe(
              res => {
                console.log('Aggiornata la source: ', res);
                loadingEl.dismiss();
              },
              err => {
                loadingEl.dismiss();
              });
          }
          else {
            loadingEl.dismiss();
          }
        })
    })
  }

  onDelete(slidingItem: IonItemSliding, book: Book) {
    console.log("Deleting unit ", book.titolo);
    this.alertCtrl.create({
      header: 'Confirm delete?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            slidingItem.close();
          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('Deleting book!');
            this.managementSrv.deleteSource(book.id).subscribe(res => {
              console.log('Deletion completed');
            })
          }
        }
      ]
    }).then(el => {
      el.present();
    });
  }

  onArchive(book: Book) {
    console.log("Archiving book", book.titolo);
    if (book.isArchived != undefined) {
      book.isArchived = !book.isArchived;
    } else {
      book.isArchived = true;
    }
    this.managementSrv.editSource(book.id, book).subscribe((res) => {
      console.log('Eseguito onArchive, il book ora è: ', book);
    });
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onShowArchived() {
    this.showArchived = !this.showArchived;
  }

  ngOnDestroy(): void {
    if (this.booksSub) {
      this.booksSub.unsubscribe();
    };
  }

}
