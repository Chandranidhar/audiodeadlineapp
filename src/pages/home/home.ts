import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {SignupPage} from "../signup/signup"
import {InAppBrowser,InAppBrowserEvent } from "@ionic-native/in-app-browser";
import {LoadingController} from "ionic-angular";
import { SpinnerDialog } from '@ionic-native/spinner-dialog';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loginpage:any;
  signupPage:any;
  constructor(public navCtrl: NavController, private iab:InAppBrowser, public loadingCtrl: LoadingController,private spinnerDialog: SpinnerDialog) {

    this.loginpage=LoginPage;
    this.signupPage=SignupPage;
  }
  gotoWeb(){
    this.spinnerDialog.show('Loading ...');
    let loading = this.loadingCtrl.create({                         //loader
      content: 'Please wait...'
    });
    loading.present();
    //alert(6);
    let options = 'location=no,clearcache=yes,hidden=yes';                //InAppBrowser
    const browser =this.iab.create("https://www.audiodeadline.com/",'_self', options);
    browser.on('loadstop').subscribe((event: InAppBrowserEvent) => {
      console.log("LOG: API Response");
      browser.hide();
      loading.dismiss();

      let TIME_IN_MS = 3000;
      setTimeout( () => {
        // somecode
        //alert(5);
        this.spinnerDialog.hide();
        browser.show();
      }, TIME_IN_MS);

      //alert(7);

      console.log(event.url);
    });


  }
}
