import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ManagementService } from '../management.service';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from '../auth/authentication.service';
import { User } from '../auth/user.model';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.scss'],
})
export class NewBookComponent implements OnInit {

  private _user: User;
  private _userSub: Subscription;

  constructor(private managementSrv: ManagementService, private modalCtrl: ModalController, private authService: AuthenticationService) { }

  onCreateBook(form: NgForm) {
    this._userSub = this.authService.user.pipe(take(1)).subscribe(res =>{
      this._user = res;
      this.managementSrv.addBook(form, this._user);
      this.modalCtrl.dismiss();
    });
  }

  onDismiss() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() { }

}
