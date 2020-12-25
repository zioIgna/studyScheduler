import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ManagementService } from '../management.service';
import { Book } from '../Book';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Question } from '../question.model';
import { difficultyLevel } from '../difficultyLevel';

@Component({
  selector: 'app-new-unit',
  templateUrl: './new-unit.component.html',
  styleUrls: ['./new-unit.component.scss'],
})
export class NewUnitComponent implements OnInit, OnDestroy {

  private _books: Book[];
  private booksSub: Subscription;
  private questions: Question[] = [];
  private singleQuestion: string;

  constructor(private managementSrv: ManagementService, private modalCtrl: ModalController) { }

  onCreateUnit(form: NgForm) {
    this.managementSrv.addUnit(form, this.questions).subscribe(res => {
      console.log('Aggiunta nuova unit ', res);

    });
    this.modalCtrl.dismiss();
  }

  onAddQuestion() {
    if (this.singleQuestion && this.singleQuestion !== "") {
      let newQuestion = new Question(this.singleQuestion, difficultyLevel.easy);
      this.questions.push(newQuestion);
      this.singleQuestion = null;
      console.log('Ho inviato la domanda ', newQuestion);
    }
  }

  trackByFn(index, item) {
    return index;
  }

  ngOnInit() {
    // this._books = this.managementSrv.books;
    this.managementSrv.fetchBooks().subscribe(res => {
      this._books = res.filter(book => book.isArchived == undefined || book.isArchived == false);
    });
    this.booksSub = this.managementSrv.books.subscribe(res => {
      this._books = res.filter(book => book.isArchived == undefined || book.isArchived == false);
    })
    // console.log('i books nella new-unit component sono: ', this._books);
  }

  onDismiss() {
    this.modalCtrl.dismiss();
  }

  ngOnDestroy() {
    if (this.booksSub) {
      this.booksSub.unsubscribe();
    }
  }

}
