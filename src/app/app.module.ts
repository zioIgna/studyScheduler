import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NavigationRoutingModule } from './navigation/navigation-routing.module';
import { EditBookComponent } from './argomenti/edit-book/edit-book.component';
import { NgCalendarModule } from 'ionic2-calendar';
import { ErrorService } from './error.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule, NgCalendarModule],
  // imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), NavigationRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: ErrorHandler, useClass: ErrorService }
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
