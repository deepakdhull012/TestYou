import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NewsFeedPage } from '../../pages/news-feed/news-feed';
import { HomePage } from '../../pages/home/home';
import { MePage } from '../../pages/me/me';
/**
 * Generated class for the TabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-tab',
  templateUrl: 'tab.html',
})
export class TabPage {

  tab1Root = HomePage;
  tab2Root = NewsFeedPage;
  tab3Root = MePage;



  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }





  ionViewDidLoad() {
    console.log('ionViewDidLoad TabPage');
  }

}
