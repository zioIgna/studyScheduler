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
        pagine: +this.form.value['pagine']
      }
    })
  }

  suggestFormValues() {
    this.form.setValue(
      {
        // title: this.book.titolo,
        title: 'test title',
        // autore: this.book.autore,
        autore: 'test autore',
        // pagine: this.book.pagine
        pagine: 10
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