import { Component } from '@angular/core';
import { NavController, NavParams,ViewController  } from 'ionic-angular';

import { IQuestion } from '../../interfaces/question';
import { QuestionsPage } from '../../pages/questions/questions';

/**
 * Generated class for the ReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
})
export class ReviewPage {
    questionList:IQuestion[] = [];
    payload:any={};
    testMode:boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
    if(navParams.data){
      console.log(navParams.data);
      this.questionList = navParams.data.questions;
      this.testMode = navParams.data.testMode;
    }
  }
  dismissReview(){
    this.viewCtrl.dismiss();
  }
  dismissReviewWithData(question,i)
  {
    this.viewCtrl.dismiss(question,i);
  }
  viewAnswers(){
    this.payload.questions = this.questionList;
    this.navCtrl.push(QuestionsPage,this.payload);
  }

  ionViewDidLoad() {
  }

}
