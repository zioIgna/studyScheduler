import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  isLoading = false;
  isLogin = true;

  constructor(private loadingCtrl: LoadingController) { }

  onSubmit(form: NgForm) {
    console.log(form);
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  ngOnInit() {
  }

}
