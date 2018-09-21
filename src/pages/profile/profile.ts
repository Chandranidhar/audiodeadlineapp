import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {HomePage} from "../home/home";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public homepage=HomePage;
  public userinfo:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage) {

    this.storage.get('userinfo').then((val) => {
      console.log('Your userinfo is', val);
    });

  }
  resetStorage(){


    this.storage.clear();   //clear storage
    this.navCtrl.push(this.homepage);      //redirecting to home page

  }

ionViewDidLoad()
{
  console.log('ionViewDidLoad ProfilePage');
}
}


