import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AuthenticationService, AuthResponseData } from './authentication.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  isLoading = false;
  isLogin = true;

  constructor(
    private loadingCtrl: LoadingController,
    private authService: AuthenticationService,
    private alertCtrl: AlertController,
    private router: Router
  ) { }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.authenticate(email, password);
    form.reset();

    // if (this.isLogin) {

    // } else {
    //   this.authService.signUp(email, password).subscribe(resData => {
    //     console.log(resData);

    //   });
    // }

  }

  authenticate(email: string, password: string) {
    this.isLoading = true;
    // this.authService.login();
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Loggin in...' })
      .then(loadingEl => {
        loadingEl.present();
        let authObs: Observable<AuthResponseData>;
        if (this.isLogin) {
          authObs = this.authService.login(email, password);
        } else {
          authObs = this.authService.signUp(email, password);
        }
        authObs.subscribe(
          resData => {
            console.log(resData);
            this.isLoading = false;
            loadingEl.dismiss();
            this.router.navigateByUrl('/navigation/tabs/args');
          },
          errRes => {
            const code = errRes.error.error.message;
            let message = 'Could not sign you up, please try again.';
            if (code === 'EMAIL_EXISTS') {
              message = 'This email address already exists!';
            } else if (code === 'EMAIL_NOT_FOUND') {
              message = 'Email address could not be found';
            } else if (code === 'INVALID_PASSWORD') { 
              message = 'This password is not correct'
            };
            this.showAlert(message);
            loadingEl.dismiss();
            this.isLoading = false;
            console.log(errRes);
          })
      })
  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'Authentication failed',
        message: message,
        buttons: ['Okay']
      })
      .then(alertEl => alertEl.present());
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  ngOnInit() {
  }

}
