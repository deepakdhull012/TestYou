import { Component } from '@angular/core';

import { PostService } from './../../services/post.service';
import { IUser } from '../../interfaces/user';
import { LoginPage } from '../../pages/login/login';

import { NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers: [PostService]
})
export class SignupPage {

  dataValid: boolean = true;
  validName: boolean = false;
  validEmail: boolean = false;
  validMobile: boolean = false;
  validPassword: boolean = false;
  validconfirmPassword: boolean = false;
  nameTypeStart: boolean = false;
  emailTypeStart: boolean = false;
  mobileTypeStart: boolean = false;
  passwordTypeStart: boolean = false;
  confirmPasswordTypeStart: boolean = false;
  password:string;
  response:any;
  registerAlert:string;


  constructor(public navCtrl: NavController, public navParams: NavParams, private _postService: PostService,private alertCtrl: AlertController,public loadingCtrl: LoadingController) {

  }
  isValidName(username){
      this.validName = (username!= null && username.toString().length>0)?true:false;
      this.nameTypeStart = true;
  }
  isValidEmail(email){
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      this.validEmail = re.test(email.toLowerCase());
      this.emailTypeStart = true;
  }
  isvalidMobile(number){
      this.validMobile = (number!= null && number.toString().length==10)?true:false;
      this.mobileTypeStart = true;
  }
  isValidPassword(password){
    this.validPassword = (password!= null && password.length>=6)?true:false;
    this.passwordTypeStart = true;
    this.password = password;

  }
  isValidConfirmPassword(confirmPassword){
    this.validconfirmPassword = (confirmPassword==this.password)?true:false;
    this.confirmPasswordTypeStart = true;
  }

  signUP(username,email,mobile,password,confirmPassword){
    return new Promise((resolve) => {
    if(this.validName && this.validEmail && this.validMobile && this.validPassword && this.validconfirmPassword){

      this.dataValid = true;
      var dataToPost = JSON.stringify({userName:username,email:email,mobile:mobile,password:password});
      var data = this._postService.addUserNormal(dataToPost);
      data.subscribe((res:IUser) => {
        this.response=res;
        if(this.response){
          resolve(true);
          if(this.response=="User already exists"){
            this.registerAlert = this.response;
          }
          else{
            this.registerAlert = "Registeration successful..";
          }
        }
        else{
          resolve(false);
        }
      });
    }
    else{
      this.dataValid = false;
      resolve(false);
    }
      });
}

presentAlertFailed() {
let alert = this.alertCtrl.create({
  title: 'OOPS..',
  subTitle: 'Failed..',
  buttons: ['Dismiss']
});
alert.present();
}
presentAlertSuccess() {
let alert = this.alertCtrl.create({
  title: 'OOPS..',
  subTitle: this.registerAlert,
  buttons: ['Dismiss']
});
alert.present();
}


presentLoadingDefault(username,email,mobile,password,confirmPassword) {
let loading = this.loadingCtrl.create({
  content: 'Please wait...'
});
loading.present();
this.signUP(username,email,mobile,password,confirmPassword).then((signupResponse) => {
      if (signupResponse){
          this.presentAlertSuccess();
        this.navCtrl.push(LoginPage);
      }
      else{
        this.presentAlertFailed();
      }
       loading.dismiss();
  });
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
