import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { QuestionsPage } from '../../pages/questions/questions';

/**
 * Generated class for the ReportCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-report-card',
  templateUrl: 'report-card.html',
})
export class ReportCardPage {

  reportCard:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.reportCard = navParams.data;
  }
  goToAnswers(){
    this.navCtrl.push(QuestionsPage,this.reportCard);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportCardPage');
  }

}
