import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ManagementService } from '../management.service';
import { Book } from '../Book';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../auth/authentication.service';
import { User } from '../auth/user.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-new-unit',
  templateUrl: './new-unit.component.html',
  styleUrls: ['./new-unit.component.scss'],
})
export class NewUnitComponent implements OnInit, OnDestroy {

  private _books: Book[];
  private booksSub: Subscription;
  private _user: User;
  private _userSub: Subscription;

  constructor(private managementSrv: ManagementService, private modalCtrl: ModalController, private authService: AuthenticationService) { }

  onCreateUnit(form: NgForm) {
    this.managementSrv.addUnit(form, this._user);
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
    // this._books = this.managementSrv.books;
    this._userSub = this.authService.user.pipe(take(1)).subscribe(res => {
      this._user = res;
      this.managementSrv.fetchBooks(this._user.id, this._user.token).subscribe(res => {
        this._books = res;
      });
    });
    this.booksSub = this.managementSrv.books.subscribe(res => {
      this._books = res;
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
    if (this._userSub) {
      this._userSub.unsubscribe();
    }
  }

}
