import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl} from "@angular/forms";
// import {Storage} from "@ionic/storage";
import {LoadingController} from "ionic-angular";
import {HttpClient} from "@angular/common/http";
import{LoginPage} from "../login/login";

/**
 * Generated class for the ResetpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-resetpassword',
  templateUrl: 'resetpassword.html',
})
export class ResetpasswordPage {
    public resetpwdForm:FormGroup;
    public errormsgforlogin:any='';
    public loginpage:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,formBuild:FormBuilder,  public loadingCtrl:LoadingController, public _http:HttpClient) {
    this.loginpage=LoginPage;
    this.resetpwdForm =formBuild.group({
      password:["",Validators.compose([Validators.required,Validators.minLength(6), Validators.maxLength(15)])],
      confirmPassword:["",Validators.compose([Validators.required,Validators.minLength(6), Validators.maxLength(15),this.equalto('password')])],
    })
    let i=this.navParams.get('data');
    console.log('this.navParams.get(\'id\')');
    console.log(i);
    console.log('this.navParams.data');
    console.log(this.navParams);
    console.log(this.navParams.data);
    console.log(this.navParams.data.id);

  }

  equalto(field_name): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      let input = control.value;
      console.log('control.value');
      console.log(control.value);
      console.log(control.root.value[field_name]);
      let isValid = control.root.value[field_name] == input;
      console.log('isValid');
      console.log(isValid);
      //console.log(this.resetpwdForm.controls['confirmPassword']);
      if (!isValid)
        return{
          equalTo:true
        };
        //return {'equalTo': {isValid}};
      //else
        //return null;
    };
  }
   confirmpasswordcheck(){

    console.log('input pass...');
    //console.log(inputpass);
    console.log('validator val');
    //console.log(ResetpasswordPage);
    console.log(this.resetpwdForm);
    return true;
  }
  resetpwd(){
    this.resetpwdForm.markAsPristine();
    console.log('this.resetpwdForm.markAsPristine');
    for (let x in this.resetpwdForm.controls){
      this.resetpwdForm.controls[x].markAsTouched();
    }

    if (this.resetpwdForm.valid) {
      let loading = this.loadingCtrl.create({                         //loader starts here
        content: 'Please wait...'
      });
      loading.present();
      // let data={password:this.resetpwdForm.value.password, accesscode:this.navParams.data.id};
      var link = 'https://audiodeadline.com/server.php?q=resetpassword';
      console.log(this.resetpwdForm.value);
      let postVal = {password:this.resetpwdForm.value.password, accesscode:this.navParams.data.id};

      this._http.post(link, postVal)                          //for sending value to the  link

        .subscribe(data => {

          let dataval:any='';
          console.log(1234567);
          console.log(data);      //value
          loading.dismiss();                                      //loader ends here
          dataval=data;
          console.log(dataval.status);                              //status
          if(dataval.status=='error'){                              //if login info error
            this.errormsgforlogin=dataval.msg;
            return;
          }
          if(dataval.status=='success'){                      //if login succeeded
            // this.storage.set('userinfo', dataval.msg);       //set the value to storage
              this.navCtrl.push(this.loginpage);
            console.log('success');
            // this.navCtrl.push(this.profilepage);          // redirecting to profile page
          }
    }, error => {
          console.log("Oooops!");
        });
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetpasswordPage');
  }

}
