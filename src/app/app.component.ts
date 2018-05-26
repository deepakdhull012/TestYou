import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, MenuController, ToastController, App  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push';


import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { TabPage } from '../pages/tab/tab';

import { IPayment } from './../interfaces/payment';

import { PostService } from './../services/post.service';
import { UtilService } from './../services/util.service';


@Component({
  templateUrl: 'app.html',
  providers: [PostService,UtilService],
})
export class MyApp {
  userData:any = {};
  paymentInfo:any;
  keepMeLogin:boolean = false;
  public counter=0;
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar,public menu:MenuController,
     public splashScreen: SplashScreen,public events: Events,public push: Push,
     public alertCtrl: AlertController,private _postService: PostService,
     private util: UtilService, public  app: App) {

    this.initializeApp();
    this.keepMeLogin = localStorage.getItem('keepMeLogin') == 'true';
    if(this.keepMeLogin){
      this.rootPage = TabPage;
    }


    this.userData = {};
    events.subscribe('user:created', (userData) => {
      this.userData = userData;
  });
console.log(this.userData);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.initPushNotification();

    });
  }

  ionViewDidEnter(){

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  logout(){
    this.nav.push(LoginPage).then((res)=>{

    });

  }
  payment(){
    this.paymentInfo = new Object();
    this.paymentInfo.amount = 10;
    this.paymentInfo.buyer_name = localStorage.getItem('userName');
    this.paymentInfo.email = "deepakdhull012@gmail.com";
    this.paymentInfo.phone = null

    var paymentRes = this._postService.pay(this.paymentInfo);
    paymentRes.subscribe((res) => {
      console.log("Res received"+res);
      console.log(typeof(res));
      window.open(JSON.parse(res).payment_request.longurl, '_self')
    });

  }
  initPushNotification() {
    if (!this.platform.is('cordova')) {
      console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
      return;
    }
    const options: PushOptions = {
      android: {
        senderID: '440503878558'
      },
      ios: {
        alert: 'true',
        badge: false,
        sound: 'true'
      },
      windows: {}
    };
    const pushObject: PushObject = this.push.init(options);

    pushObject.on('registration').subscribe((data: any) => {
      console.log('device token -> ' + data.registrationId);
      //TODO - send device token to server
    });

    pushObject.on('notification').subscribe((data: any) => {
      console.log('message -> ' + data.message);
      //if user using app and push notification comes
      if (data.additionalData.foreground) {
        // if application open, show popup
        let confirmAlert = this.alertCtrl.create({
          title: 'New Notification',
          message: data.message,
          buttons: [{
            text: 'Ignore',
            role: 'cancel'
          }, {
            text: 'View',
            handler: () => {
              //TODO: Your logic here
              alert('Deepak Says '+data.message+' To You!!');
            //  this.nav.push(DetailsPage, { message: data.message });
            }
          }]
        });
        confirmAlert.present();
      } else {
        //if user NOT using app and push notification comes
        //TODO: Your logic on click of push notification directly
        alert('A lot has happened ..since you left the app..')
        console.log('Push notification clicked');
      }
    });

    pushObject.on('error').subscribe(error => {console.error('Error with Push plugin' + error);
  alert('Error: '+error);});
  }
}
