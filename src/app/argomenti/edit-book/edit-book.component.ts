import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Book } from 'src/app/Book';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss'],
})
export class EditBookComponent implements OnInit {

  @Input() book: Book;
  @ViewChild('f') form: NgForm;

  constructor(private modalCtrl: ModalController) { }

  onCreateBook() {
    if (!this.form.valid) {
      return;
    }
    this.modalCtrl.dismiss({
      bookData: {
        titolo: this.form.value['title'],
        autore: this.form.value['autore'],
        pagine: +this.form.value['pagine'],
        isArchived: false
      }
    })
  }

  suggestFormValues() {
    this.form.setValue(
      {
        title: this.book.titolo,
        autore: this.book.autore,
        pagine: this.book.pagine
      }
    );
  }

  onDismiss() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
    setTimeout(() => {
      this.suggestFormValues();
    });
  }

}
