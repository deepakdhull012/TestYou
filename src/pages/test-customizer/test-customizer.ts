import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IQuestion } from '../../interfaces/question';
import { TestPage } from '../../pages/test/test';

/**
 * Generated class for the TestCustomizerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-test-customizer',
  templateUrl: 'test-customizer.html',
})
export class TestCustomizerPage {
  questionList:IQuestion[]= [];
  filteredQuestionList:IQuestion[] = [];
  subjectId:string;
  chapterId:string;
  testMode: boolean;
  payload:any = {};
  limit:number=0;
  typeOfTest:number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if(navParams.data){
      if(navParams.data.mode == 1){   // 1 means subject is passed
          this.questionList = navParams.data.questions;
          this.subjectId = navParams.data.subject._id;

      }
      if(navParams.data.mode == 2){   // 2 means chapter is passed
          this.questionList = navParams.data.questions;
          this.chapterId = navParams.data.chapter._id;
      }
      this.typeOfTest = navParams.data.mode;
    }
    this.testMode = false;
    this.filteredQuestionList = this.questionList;
    this.limit = this.filteredQuestionList.length;
  }

  onYearChange(year){
    this.applyFilter(year);
  }
  notify() {
  this.payload.testMode = this.testMode;
}
applyFilter(year){
  this.filteredQuestionList = [];
  if(year.length == 0)
  {
    this.filteredQuestionList = this.questionList;
  }
  for (let oneYear of year) {
    for(let question of this.questionList){
      if(oneYear>=2011 && question.year == oneYear){
        this.filteredQuestionList.push(question);
      }
      if(oneYear<2011 && question.year >= oneYear && question.year < 2011){
        this.filteredQuestionList.push(question);
      }
    }
  }
  this.limit = this.filteredQuestionList.length;
}

proceedToTest(){
  this.payload.limit = this.limit;
  this.payload.testMode = this.testMode;
  this.payload.questions = this.filteredQuestionList;
  this.payload.typeOfTest = this.typeOfTest;
  console.log(this.payload);
  if(this.limit<=0){
    alert('Questions to be attempt must be greater then 0..');
  }
  else if(this.limit>this.filteredQuestionList.length)
  {
    alert('You can select maximum '+this.filteredQuestionList.length+' questions');
  }
  else{
    this.navCtrl.push(TestPage,this.payload);
  }

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestCustomizerPage');
  }

}
