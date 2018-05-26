import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, Content } from 'ionic-angular';
import { PutService } from './../../services/put.service';

import { ReviewPage } from '../../pages/review/review';
import { IQuestion } from '../../interfaces/question';

/**
 * Generated class for the SinglePageTestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-single-page-test',
  templateUrl: 'single-page-test.html',
  providers: [PutService]
})
export class SinglePageTestPage {
  @ViewChild(Content) content: Content;

  questionList:IQuestion[] = [];
  onlyNextButtonAvailable:boolean=false;
  displayCorrectImage = false;
  displayWrongImage = false;
  displayExplanation = false;
  displayCorrectAnswer = false;
  payload:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,private _putService: PutService) {
    if(navParams.data){
      this.questionList = navParams.data;
      for(let question of this.questionList){
        question.candidateAnswer = "";
        question.attempted = false;
        question.toBeReviewed = false;
        question.isCorrect =false;
        question.isPracticeMode = true;
      }
    }
  }
  selected(question,userAnswer){
    question.candidateAnswer = userAnswer;
    question.attempted = true;
    question.toBeReviewed = false;
    if(question.candidateAnswer.trim() == question.correctAnswer.trim())
    {
      question.isCorrect =true;
    }
    var dataToPost = JSON.stringify({isCorrect:question.isCorrect});
    var data = this._putService.questionAttempted(question._id,dataToPost);
    data.subscribe((res:any) => {

    });
  }

  goToReview(){
    this.payload = {};
    this.payload.questions = this.questionList;
    this.payload.testMode = false;
    let reviewModal = this.modalCtrl.create(ReviewPage, this.payload);
    reviewModal.onDidDismiss((question,i) => {
      if(question != null ){
          this.scrollTo(question._id);
      }

   });
    reviewModal.present();
  }
  scrollTo(element:string) {
  let yOffset = document.getElementById(element).offsetTop;
  console.log(yOffset);
  this.content.scrollTo(0, yOffset, 10)
}

  ionViewDidLoad() {

  }

}
