import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  public serverData:any={status:''};
  private forgotPwdForm:FormGroup;
  public errormsgforlogin:any='';
  constructor(public navCtrl: NavController, public navParams: NavParams,formBuild:FormBuilder,private _http:HttpClient, private storage:Storage) {
    this.storage.get('userinfo').then((value => {
      console.log('Userinfo is',value);

    }));
    this.forgotPwdForm= formBuild.group({
      email: ["",Validators.required],
    });
  }
  static emailValidator(inputEmail):any{

    if (inputEmail.pristine) {
      return null;
    }
    inputEmail.markAsTouched();
    let filter=/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    if (String (inputEmail.value).search(filter)==-1){
      return{
        invalidEmail:true
      }
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }
  sendpwd(){
    this.errormsgforlogin='';
    this.forgotPwdForm.markAsPristine();
    for (let i in this.forgotPwdForm.controls){
      this.forgotPwdForm.controls[i].markAsTouched();
    }

    if (this.forgotPwdForm.valid){
      var link = 'https://audiodeadline.com/server.php?q=forgotpassword';
      console.log(123456);
      this._http.post(link, this.forgotPwdForm.value)
        .subscribe(data =>{
          console.log(1234567);
          console.log(data);
          let dataval:any='';
          dataval=data;
          this.serverData=data;
          if (dataval.status=='success'){
            this.storage.set('userinfo', dataval.msg);
            console.log('success');
          }
          if(dataval.status=='error'){                //if login info error

            this.errormsgforlogin=dataval.msg;
            console.log('errormsgforlogin');
            return;
          }

        },error1 => {
          console.log('error');
          });

    }

  }
}
