import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';



/**
 * Generated class for the VideoPlayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-video-player',
  templateUrl: 'video-player.html',
})
export class VideoPlayerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoPlayerPage');
  }
  playVideo(){
    console.log('video fn called');
    //this.youtube.openVideo('ulNswX3If6U');
  }

}
