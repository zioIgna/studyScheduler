import { Component, OnInit, OnDestroy } from '@angular/core';
import { ManagementService } from '../management.service';
import { UnitComponent } from '../unit/unit.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../Book';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Question } from '../question.model';
import { difficultyLevel } from '../difficultyLevel';

@Component({
  selector: 'app-update-unit',
  templateUrl: './update-unit.page.html',
  styleUrls: ['./update-unit.page.scss'],
})
export class UpdateUnitPage implements OnInit, OnDestroy {

  unit: UnitComponent;
  unitId: string;
  singleQuestion: string = null;
  tempQuestions: Question[] = [];

  private _books: Book[];
  private booksSub: Subscription;

  constructor(private managementSrv: ManagementService, private route: ActivatedRoute, private router: Router) { }

  onEditUnit(form: NgForm) {
    this.managementSrv.editUnit(form, this.unitId, this.tempQuestions).subscribe(res => {
      console.log("Allo edit della untià ho ottenuto: ", res);
      this.router.navigate(['/navigation/tabs/args', this.unitId]);
    });
  }

  onMoveUp(index: number) {
    if (index > 0) {
      [this.tempQuestions[index - 1], this.tempQuestions[index]] = [this.tempQuestions[index], this.tempQuestions[index - 1]];
    }
    console.log('Muovo in su lo indice: ', index);
  }

  onMoveDown(index: number) {
    if (index < this.tempQuestions.length - 1) {
      [this.tempQuestions[index], this.tempQuestions[index + 1]] = [this.tempQuestions[index + 1], this.tempQuestions[index]];
    }
    console.log('Muovo in giù lo indice: ', index);
  }

  onAddQuestion() {
    if (this.singleQuestion && this.singleQuestion !== "") {
      let newQuestion = new Question(this.singleQuestion, difficultyLevel.easy);
      this.tempQuestions.push(newQuestion);
      this.singleQuestion = null;
      console.log('Ho inviato la domanda ', newQuestion);
    }
  }

  onDeleteQuestion(index: number) {
    this.tempQuestions.splice(index, 1);
  }

  ngOnInit() {
    this.unitId = this.route.snapshot.params['unitId'];
    console.log('unitId: ', this.unitId);
    this.managementSrv.getUnitById(this.unitId).subscribe(myUnit => {
      this.unit = myUnit;
      if (this.unit.questions) {
        this.tempQuestions = [...this.unit.questions];
      }
    });
    this.managementSrv.fetchBooks().subscribe(res => {
      this._books = res.filter(book => book.isArchived == undefined || book.isArchived == false);
    });
    this.booksSub = this.managementSrv.books.subscribe(res => {
      this._books = res.filter(book => book.isArchived == undefined || book.isArchived == false);
    })
  }

  ngOnDestroy(): void {
    if (this.booksSub) {
      this.booksSub.unsubscribe();
    }
    this.tempQuestions = [];
  }

}
