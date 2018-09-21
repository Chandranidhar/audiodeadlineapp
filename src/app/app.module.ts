import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ResetpasswordPage } from '../pages/resetpassword/resetpassword';
import {LoginPage} from "../pages/login/login";
import {HttpClientModule} from "@angular/common/http";
import { IonicStorageModule } from '@ionic/storage';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import {ProfilePage} from "../pages/profile/profile";
// import {LoadingController} from "ionic-angular";
import {ForgotPasswordPage} from "../pages/forgot-password/forgot-password";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import { Deeplinks } from '@ionic-native/deeplinks';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ProfilePage,
    ForgotPasswordPage,
    ResetpasswordPage
  ],
  imports: [
    BrowserModule,HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ProfilePage,
    ForgotPasswordPage,
    ResetpasswordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,InAppBrowser,SpinnerDialog,Deeplinks,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
