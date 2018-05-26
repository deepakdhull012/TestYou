import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams ,Navbar ,Platform,Slides,Content,LoadingController,ModalController,AlertController} from 'ionic-angular';
import { ShufflePipe } from 'ngx-pipes';
declare var require: any;
var shuffle = require('shuffle-array');


import { ReportCardPage } from '../../pages/report-card/report-card';
import { ReviewPage } from '../../pages/review/review';
import { SubmitTestDialogPage } from '../../pages/submit-test-dialog/submit-test-dialog';

import { GetService } from './../../services/get.service';
import { PutService } from './../../services/put.service';
import { UtilService } from './../../services/util.service';

import { IQuestion } from '../../interfaces/question';
import { ITest } from '../../interfaces/test';
import { IAttemptedTest } from '../../interfaces/attemptedTests';
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/take'

/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
  providers: [GetService,PutService,UtilService]
})
export class TestPage {

  @ViewChild(Slides) slides: Slides;
  @ViewChild(Content) content: Content;
  @ViewChild('navbar') navBar: Navbar;
  questionList:IQuestion[];
  reportCard:any;
  timeLeft:string;
  displayCorrectImage = false;
  displayWrongImage = false;
  displayExplanation = false;
  displayCorrectAnswer = false;
  optionsDisabled = false;
  allButtonsDisable = false;
  loading:any;
  payload:any;
  submitPayload:any;
  onlyNextButtonAvailable:boolean=false;
  noOfQuesAttempted:number = 0;
  noOfQuestToReview:number = 0;
  secLeft:number;
  attemptedTest:ITest;



  constructor(public navCtrl: NavController,private platform: Platform, public navParams: NavParams,
    private _getService: GetService,private _putService: PutService,private util:UtilService,
    public modalCtrl: ModalController,private alertCtrl: AlertController) {

      this.platform.ready().then(() => {

        this.platform.registerBackButtonAction(() => {
          this.presentConfirm();
      });
    });

    if(navParams.data){
      this.attemptedTest = navParams.data;
      console.log("received",this.attemptedTest)
      if(this.attemptedTest.testType == "mock" || this.attemptedTest.testType == "previous"){
        this.questionList = navParams.data.questions;

      }
      else{                 // In case of mock test or previous year do not shuffle
        this.questionList = shuffle(navParams.data.questions);
      }
      for(let question of this.questionList){
        if(question.candidateAnswer){
          this.noOfQuesAttempted++;
        }
      }
      //this.slides.lockSwipeToPrev(true);
      //this.slides.lockSwipeToNext(true);
    }

    this.reportCard = {};
    this.reportCard.correctAnswers = 0;
    this.reportCard.wrongAnswers = 0;
    this.reportCard.skippedAnswers = 0;
    let start = 0;
    if(this.attemptedTest.secLeft){
      start = this.attemptedTest.secLeft;
    }
    else{
      if(this.attemptedTest.limit>0){
        start = (60 * this.attemptedTest.limit);
      }
      else{
        start = (60 * this.questionList.length);
      }
    }

    Observable.timer(0,1000)
      .map(i => start - i)
      .take(start + 1)
      .subscribe(i =>{
        var date = new Date(null);
        date.setSeconds(i);
        this.timeLeft = date.toISOString().substr(11,8);
        this.secLeft = i-1;
      });


  }

  ionViewDidLoad() {
  //  this.presentLoadingDefault();
  this.navBar.backButtonClick = () => {
      this.presentConfirm();
    };
  }
  ngOnInit() {
    //this.slides.lockSwipeToPrev(true);
    //this.slides.lockSwipeToNext(true);
  }
  ionViewWillEnter() {

    }



  selected(question,index) {
    if(question.candidateAnswer){
    this.optionsDisabled = true;
    this.allButtonsDisable = true;
    question.attempted = true;
    question.candidateAnswer = question.candidateAnswer.trim();
    question.noOfTimesAttempted++;
    this.noOfQuesAttempted++;
    if(question.correctAnswer.trim() == question.candidateAnswer){
      question.isCorrect = true;
      question.noOfTimesCorrectlyAttempted++;

    if(!this.attemptedTest.testMode) {
      this.displayCorrectImage=true;}
      this.reportCard.correctAnswers++;

    }
    else{
    if(!this.attemptedTest.testMode) {  this.displayWrongImage=true;
      this.displayExplanation = true;
    }

      this.reportCard.wrongAnswers++;
    }
    if(!this.slides.isEnd()){
    setTimeout(() => this.goToNext(), 1000);
  }
  else{
    this.submitDialoge();
  }
  this.questionAttempted(question._id,this.displayCorrectImage);
  if(this.attemptedTest.testType == "mock" || this.attemptedTest.testType == "previous"){
    this.updateAttemptedTest(question,index);
  }


  }
  if(!question.candidateAnswer){
    this.util.displayToast("Please select an answer or skip..");
  }
}

  skip(){
    this.allButtonsDisable = false;
    this.reportCard.skippedAnswers++;
    if(!this.slides.isEnd()){
    this.goToNext();
  }
  else{
    this.submitDialoge();
  }

  }
  updateAttemptedTest(question,index){
    console.log("fn called");
    let dataToPost = <any>{};
    dataToPost.index = index;
    dataToPost.value = question.candidateAnswer;
    dataToPost.attemptId = this.attemptedTest.attemptId;
    dataToPost.timeLeft = this.secLeft;
    let updatedTest = this._putService.updateAttemptedTest(dataToPost);
    updatedTest.subscribe((res:IAttemptedTest)=>{
      if(res){
        console.log(res);
      }
    });
  }

  showAnswerWithExplanation(){
    this.displayCorrectAnswer = true;
    this.onlyNextButtonAvailable = true;
    this.displayExplanation = true;
  }
  goToNext(){
    //this.slides.lockSwipeToNext(false);

      this.slides.slideNext(1000);
    //  this.slides.lockSwipeToNext(true);
      this.displayCorrectImage=false;
      this.displayWrongImage=false;
      this.displayExplanation = false;
      this.optionsDisabled = false;
      this.allButtonsDisable = false;
      this.onlyNextButtonAvailable = false;
      this.displayCorrectAnswer = false;
      this.content.scrollToTop();
  }

  goto(slideNumber) {
		this.slides.slideTo(slideNumber, 500);
	}

  goToReportCard(){
    this.reportCard.questions = this.questionList;
    this.navCtrl.push(ReportCardPage,this.reportCard);
  }
  questionAttempted(id,isCorrect){
    var dataToPost = JSON.stringify({isCorrect:isCorrect});
    var data = this._putService.questionAttempted(id,dataToPost);
    data.subscribe((res:any) => {

    });
  }

  goToReview(){
    this.payload = {};
    this.payload.questions = this.questionList;
    this.payload.testMode = this.attemptedTest.testMode;
    let reviewModal = this.modalCtrl.create(ReviewPage, this.payload);
    reviewModal.onDidDismiss((question,i) => {
      console.log(question,i);
      if(i != null ){
          this.goto(i);
      }

   });
    reviewModal.present();
  }
  scrollTo(element:string) {
  let yOffset = document.getElementById(element).offsetTop;
  console.log(yOffset);
  this.content.scrollTo(0, yOffset, 10)
}
  submitDialoge(){
    this.submitPayload = {};
    this.submitPayload.attemptedQuestions = this.noOfQuesAttempted;
    this.submitPayload.unAttemptedQuestions = this.questionList.length - this.noOfQuesAttempted;
    this.submitPayload.questionsToReview = this.noOfQuestToReview;
    this.submitPayload.timeLeft = this.secLeft;
    console.log(this.submitPayload);

    let submitModal = this.modalCtrl.create(SubmitTestDialogPage,this.submitPayload);
    submitModal.onDidDismiss((toSubmit) => {
      this.allButtonsDisable = false;
      this.optionsDisabled = false;
      if(toSubmit){
        this.navCtrl.pop();
        this.goToReportCard();
      }

   });
    submitModal.present();
  }

  markForReview(question,toReview){
    question.toBeReviewed = toReview;
    if(toReview){
      this.noOfQuestToReview++;
    }
    else{
      this.noOfQuestToReview--;
    }
  }

  presentConfirm() {
  let alert = this.alertCtrl.create({
    title: 'Test In Progress.',
    message: 'Are you sure you want to leave the test?',
    buttons: [
      {
        text: 'Yes, I want.',
        role: 'cancel',
        handler: () => {
          this.navCtrl.pop();
        }
      },
      {
        text: 'No, I wanna Continue',
        handler: () => {

        }
      }
    ]
  });
  alert.present();
}

}
