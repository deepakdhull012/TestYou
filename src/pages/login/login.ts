import { Component , ViewChild,ElementRef} from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Platform, ToastController} from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { Events } from 'ionic-angular';


import { IUser } from '../../interfaces/user';
import { PostService } from './../../services/post.service';

import { SignupPage } from '../../pages/signup/signup';
import { TabPage } from '../../pages/tab/tab';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [PostService]
})

export class LoginPage {

  validEmail: boolean = false;
  emailTypeStart: boolean = false;
  response: string;
  loading:any;
  userData: any;
  commonuserData:any={};
  gmailres:any;
  gmailerr:any;
  keepMeLogin:boolean = false;
  public counter=0;
  @ViewChild('password2') passwordBox: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams,
     private _postService: PostService, private alertCtrl: AlertController,
     public loadingCtrl: LoadingController,private facebook: Facebook,private googlePlus: GooglePlus,
     public events: Events, public platform: Platform,private toastCtrl: ToastController) {
       this.platform.ready().then(() => {
         this.platform.registerBackButtonAction(() => {
           if (this.counter == 0) {
             this.counter++;
             this.presentToast("Press again to Exit.");
             setTimeout(() => { this.counter = 0 }, 3000)
           } else {
             // console.log("exitapp");
             this.platform.exitApp();
           }
         });
       });

  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: "bottom"
    });
    toast.present();
  }

  loginWithGmail(){
    console.log('gmail login called');
    this.googlePlus.login({
      'webClientId': '440503878558-ptlkb5vvfkr36f5k56r2clcni6oaeklb.apps.googleusercontent.com'
    })
  .then(res => {

    this.gmailres=res;
    this.commonuserData.imageUrl = this.gmailres.imageUrl;
    this.commonuserData.displayName = this.gmailres.displayName;
    this.commonuserData.email = this.gmailres.email;

    var dataToPost = JSON.stringify({userName:this.commonuserData.displayName,email:this.commonuserData.email,
                                      mobile:"",password:"gmailPwdPsd",isverified:true,gmailImage:this.commonuserData.imageUrl});
    var data = this._postService.addUserSocial(dataToPost);
    data.subscribe((res:IUser) => {
      localStorage.setItem('userId', res._id);
      localStorage.setItem('loginMode', 'gmail');
      localStorage.setItem('userImage', this.commonuserData.imageUrl);
      localStorage.setItem('userName', this.commonuserData.displayName);
    });
    this.events.publish('user:created', this.commonuserData);
      localStorage.setItem('keepMeLogin', this.keepMeLogin.toString());

    this.navCtrl.push(TabPage);
  })
  .catch(err => {console.error(err);this.gmailerr=err;});

  }

  loginWithFB() {
      this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
        this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
          this.userData = {email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name']};

          console.log(this.userData);
          if(this.userData)
          {
            if(!this.userData.email){
              this.commonuserData.email = "No Email Added..";
              this.commonuserData.emailToSave = this.userData.username;
            }
            else{
              this.commonuserData.email = this.userData.email;
              this.commonuserData.emailToSave = this.userData.email;
            }
            this.commonuserData.imageUrl = this.userData.picture;
            this.commonuserData.displayName = this.userData.username;
            this.commonuserData.mobile = "";



            var dataToPost = JSON.stringify({userName:this.commonuserData.displayName,email:this.commonuserData.emailToSave,
              mobile:this.commonuserData.mobile,password:"fbPwdPsd",isverified:true,facebookImage:this.commonuserData.imageUrl});
            var data = this._postService.addUserSocial(dataToPost);
            data.subscribe((res:IUser) => {

              localStorage.setItem('userId', res._id);
              localStorage.setItem('loginMode', 'facebook');
              localStorage.setItem('userImage', this.commonuserData.imageUrl);
              localStorage.setItem('userName', this.commonuserData.displayName);

            });
            this.events.publish('user:created', this.commonuserData);
            localStorage.setItem('keepMeLogin', this.keepMeLogin.toString());
            this.navCtrl.push(TabPage);
          }
        });
      });
    }

  isValidEmail(email){
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      this.validEmail = re.test(email.toLowerCase());
      this.emailTypeStart = true;
  }

  goToSignUp(){
    this.navCtrl.push(SignupPage);
  }

  login(email,password){
    return new Promise((resolve,reject) => {
    var dataToPost = JSON.stringify({email:email,password:password});
    var data = this._postService.loginUser(dataToPost);
    data.subscribe((res:IUser) => {
      if(res){
        console.log(res);
        localStorage.setItem('userId', res._id);
        localStorage.setItem('loginMode', 'normal');
        localStorage.setItem('userName', res.userName);

        this.response = "Success";
        resolve(true);

      }
      else{
        this.response = "Login Failed";
        reject(false);
      }
    });
  });

  }

  showPassword(){
    if(this.passwordBox.nativeElement.type == 'password' && this.passwordBox.nativeElement.value.length > 0){
      this.passwordBox.nativeElement.type = 'text';
  }
  else{
    this.passwordBox.nativeElement.type = 'password';
  }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

  }
  presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'OOPS..',
    subTitle: 'Failed..',
    buttons: ['Dismiss']
  });
  alert.present();
}


presentLoadingDefault(email,password) {
  let loading = this.loadingCtrl.create({
    content: 'Please wait logging...'
  });
  loading.present();
  this.login(email,password).then((loginResponse) => {
        if (loginResponse){
          loading.dismiss();
          localStorage.setItem('keepMeLogin', this.keepMeLogin.toString());
          this.navCtrl.push(TabPage);
        }
        else{
          loading.dismiss();
          this.presentAlert();
        }

    }).catch((err)=>{
      console.log(err);
      loading.dismiss();
    })
}



}
