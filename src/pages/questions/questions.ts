import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { IQuestion } from '../../interfaces/question';

/**
 * Generated class for the QuestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html',
})
export class QuestionsPage {

  questionList:IQuestion[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if(navParams.data){
      this.questionList = navParams.data.questions;
      console.log(navParams.data.questions);
    }
  }

  ionViewDidLoad() {

  }
  ionViewWillEnter() {

    }
}
