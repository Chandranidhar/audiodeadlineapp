import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import { Storage } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import { ResetpasswordPage } from '../pages/resetpassword/resetpassword';
import {ProfilePage} from "../pages/profile/profile";
import { Deeplinks } from '@ionic-native/deeplinks';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav)nav: Nav;
  //rootPage:any = HomePage;
  rootPage:any ='';
  public loginpage = LoginPage;
  public profilepage = ProfilePage;
  public routeflag = 0;
  //public resetpasswordpage = ResetpasswordPage;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage,private deeplinks: Deeplinks ) {
    this.deeplinks.route({
      '/resetpassword/:id': ResetpasswordPage,
      //'/universal-links-test': AboutPage,
      //'/products/:productId': ProductPage
    }).subscribe(match => {



        alert(match.$link.path);
        if (match.$link.path.indexOf("resetpassword") !=-1) {
          //alert(55);
          this.routeflag=1;
          //alert(elm);
          //foundLinks++;
          this.nav.push(ResetpasswordPage,{id:match.$args.id});
        }

      // match.$route - the route we matched, which is the matched entry from the arguments to route()
      // match.$args - the args passed in the link
      // match.$link - the full link data
      console.log('Successfully matched route', match);
    }, nomatch => {
      // nomatch.$link - the full link data
      //alert(25);
      //alert(nomatch);
      console.error('Got a deeplink that didn\'t match', nomatch);
    });

    this.storage.get('userinfo').then((val)=>{
      if(val!=null){
        if(this.routeflag==0)this.nav.push(this.profilepage);
      }
      else
      if(this.routeflag==0) this.rootPage=HomePage;

    })
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      let TIME_IN_MS = 1500;
      setTimeout( () => {
        // some code
        //alert(5);
        splashScreen.hide();
      }, TIME_IN_MS);
    });
  }
}

