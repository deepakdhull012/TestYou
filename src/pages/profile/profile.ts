import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IUser } from '../../interfaces/user';

import { GetService } from './../../services/get.service';
import { UtilService } from './../../services/util.service';

import { ChatPage } from '../../pages/chat/chat';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [GetService,UtilService]
})
export class ProfilePage {
  userId:string;
  user:IUser;
  loggedInUserId:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private _getService: GetService,private util:UtilService) {
    if(navParams.data){
      this.userId = navParams.data;
      this.loggedInUserId = localStorage.getItem('userId');
      var loading = this.util.displayLoading("Please wait loading profile..");
      this.getUserInfoById().then((loaded)=>{
        loading.dismiss();
      });
    }
  }

  ionViewDidLoad() {

  }
  getUserInfoById(){
    console.log(this.userId);
    return new Promise((resolve) => {
    var data = this._getService.getUserInfoById(this.userId);
    data.subscribe((res:IUser) => {
      this.user = res;
      if(this.user.gmailImage){
        this.user.displayImage = this.user.gmailImage;
      }
      else if(this.user.facebookImage){
        this.user.displayImage = this.user.facebookImage;
      }
      else if(this.user.uploadedImage){
        this.user.displayImage = this.user.uploadedImage;
      }
      console.log(this.user);
      resolve(true);
    });

  });
  }
  goToChat(){
    this.navCtrl.push(ChatPage,this.user);
  }


}
