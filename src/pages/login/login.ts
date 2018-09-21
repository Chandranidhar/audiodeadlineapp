import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Storage } from '@ionic/storage';
import {HttpClient} from "@angular/common/http";
import {ProfilePage} from "../profile/profile";
import {LoadingController} from "ionic-angular";
import {ForgotPasswordPage} from "../forgot-password/forgot-password";
import {ResetpasswordPage} from "../resetpassword/resetpassword";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public errormsgforlogin:any='';
  private loginForm:FormGroup;
  // private nav:NavController;
  public profilepage= ProfilePage;
  public forgotpasswordpage:any;
  public resetpasswordpage:any;
  public resetpasswordparams={'id':'c38eRi5ImEJgmmjqM3ed'};

  constructor(public navCtrl: NavController, public navParams: NavParams, formBuild:FormBuilder,private _http:HttpClient, private storage: Storage, public loadingCtrl: LoadingController) {
    this.forgotpasswordpage=ForgotPasswordPage;
    this.resetpasswordpage=ResetpasswordPage;
    // this.storage.get('userinfo').then((value => {
    //   console.log('Userinfo is',value);
    //   if(value!=null)
    //     this.navCtrl.push(this.profilepage);
    // }));
    this.loginForm= formBuild.group({
      //email: ["",Validators.required],
      email: ["",Validators.compose([Validators.required, LoginPage.customValidator])],
      password: ["",Validators.required],
    });
  }
  //custom email validator
  static customValidator(inputEmail): any{
    console.log('inputEmail');
    console.log(inputEmail);


    if(inputEmail.pristine){
      return null;
    }

    inputEmail.markAsTouched();


    let filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    console.log( String(inputEmail.value).search (filter) != -1);
    if(String(inputEmail.value).search (filter) == -1){
      console.log('valid');
      return{
        invalidEmail:true
      };
    }
    /* else {
       //return false;
       console.log('invalid ...');
       return false;

     }*/

    /*return{
      invalidEmail:true
    };*/
  }

  login(){
    this.errormsgforlogin='';
    this.loginForm.markAsPristine();    //for triggering validation in submit
    console.log(12345);
    for(let i in this.loginForm.controls){
      this.loginForm.controls[i].markAsTouched();
      console.log(456789);
    }
    if (this.loginForm.valid) {
      let loading = this.loadingCtrl.create({                         //loader
        content: 'Please wait...'
      });
      loading.present();
      var link = 'https://audiodeadline.com/server.php?q=userlogin';

      this._http.post(link, this.loginForm.value)                  //for sending value to the  link

    .subscribe(data => {

          let dataval:any='';
          console.log(1234567);
          console.log(data);      //value
          loading.dismiss();
          //loader ends here
          dataval=data;
          console.log(dataval.status);     //status
          if(dataval.status=='error'){      //if login info error
            this.errormsgforlogin=dataval.msg;
            return;
          }
          if(dataval.status=='success'){                      //if login succeeded
            this.storage.set('userinfo', dataval.msg);       //set the value to storage

            console.log('success');
            this.navCtrl.push(this.profilepage);          // redirecting to profile page
          }

        }, error => {
          console.log("Oooops!");
        })  ;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
