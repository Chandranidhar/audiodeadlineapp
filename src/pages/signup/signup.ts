import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SignupDetailPage} from "../signup-detail/signup-detail";
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  private signUpForm:FormGroup;
    public signupdetailpage=SignupDetailPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, formBuild:FormBuilder, public alertCtrl: AlertController) {


    this.signUpForm= formBuild.group({

      musician:[false],
       dancer:[false],
      model:[false],
      affiliate:[false],
      fan:[false],
    })

  }
  signUp(){

   console.log('this.signUpForm.value');
   console.log(this.signUpForm.value);
   console.log(this.signUpForm.value.affiliate);
   console.log(this.signUpForm.value.fan);
      // if(this.signUpForm.value.musician==true || this.signUpForm.value.dancer==true || this.signUpForm.value.model==true || this.signUpForm.value.affiliate==true || this.signUpForm.value.fan==true){
      //
      //
      // }
      // else {
      //     return null;
      // }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
    getfanallowval(){
        console.log('this.signUpForm.value.musician');
        console.log(this.signUpForm.value.musician);
        console.log(this.signUpForm.value);
        if(this.signUpForm.value.musician==true || this.signUpForm.value.dancer==true || this.signUpForm.value.model==true){
            this.signUpForm.patchValue({            //forces the 'fan value' to turn false
                fan : false
            });
            return true;
        }
        else return false;
    }
    buttonDisable(){
if (this.signUpForm.value.musician==false
    && this.signUpForm.value.dancer==false && this.signUpForm.value.model==false && this.signUpForm.value.affiliate==false   && this.signUpForm.value.fan==false
)
{
    const alert = this.alertCtrl.create({
        title: 'Make your choice!',
        subTitle: 'You must choose atleast one option!',
        buttons: ['OK']
    });
    alert.present();
}
    else
    this.navCtrl.push(this.signupdetailpage);

}




}
