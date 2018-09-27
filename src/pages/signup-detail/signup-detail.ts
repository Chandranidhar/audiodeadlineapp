import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
/**
 * Generated class for the SignupDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup-detail',
  templateUrl: 'signup-detail.html',
})
export class SignupDetailPage {
  private signUpDetailForm:FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuild:FormBuilder) {
    this.signUpDetailForm = formBuild.group({

      firstname:['',Validators.required],
      lastname:['',Validators.required],
      gender:[''],
      country:['',Validators.required],
      state:['',Validators.required],
      email:['',Validators.required],
      phone:['',Validators.required],
      zip:['',Validators.required],
          terms:[''],
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupDetailPage');
  }
  signUpDetails(){

  }

}
