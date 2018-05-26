import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { GetService } from './../../services/get.service';
import { PostService } from './../../services/post.service';
import { UtilService } from './../../services/util.service';
import { ITest } from '../../interfaces/test';
import { IQuestion } from '../../interfaces/question';
import { IAttemptedTest } from '../../interfaces/attemptedTests';
import { TestPage } from '../../pages/test/test';


@Component({
  selector: 'page-test-list',
  templateUrl: 'test-list.html',
  providers: [GetService,UtilService]
})
export class TestListPage {

  testType : string = "";
  testList : ITest[] = [];
  attemptedTests : IAttemptedTest[] = [];
  payload:any={};
  testsLoaded:boolean = false;
  attemptedTestsLoaded:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,private _getService: GetService,
    private _postService: PostService,private util:UtilService) {
      if(navParams.data){
        this.testType=navParams.data;
      }
  }

  ionViewDidLoad() {
    this.loadContent();
  }
  loadContent() {
    var loading = this.util.displayLoading("Please wait loading tests..");
    if(this.testType == "mock"){
      this.getAllMockTests().then((loaded) => {
        if(loaded){
          this.testsLoaded = true;
          if(this.attemptedTestsLoaded){
            for(let test of this.testList){
              test.noOfQuesAttempted = 0;
              test.questions = [];
              this.getQuestionsTestWise(test);
            }
            loading.dismiss();
          }
        }

        });
    }
    if(this.testType == "previous"){
      this.getAllPreviousYearTests().then((loaded) => {
        if(loaded){
          this.testsLoaded = true;
          if(this.attemptedTestsLoaded){
            for(let test of this.testList){
              test.noOfQuesAttempted = 0;
              test.questions = [];
              this.getQuestionsTestWise(test);
            }
            loading.dismiss();
          }
        }
        });
    }
    this.getAttemptedTestOfUser().then((loaded)=>{
      if(loaded){
        this.attemptedTestsLoaded = true;
        if(this.testsLoaded){
          for(let test of this.testList){
            test.noOfQuesAttempted = 0;
            test.questions = [];
            this.getQuestionsTestWise(test);
          }
          loading.dismiss();
        }

      }
    });



  }

  getAllMockTests(){
    return new Promise((resolve) => {
    var data = this._getService.getAllMockTests();
    data.subscribe((res:ITest[]) => {
      this.testList=res;
      resolve(true);
    });
});
}

getAllPreviousYearTests(){
  return new Promise((resolve) => {
  var data = this._getService.getAllPreviousYearTests();
  data.subscribe((res:ITest[]) => {
    this.testList=res;
    for(let test of this.testList){
      test.noOfQuesAttempted = 0;
      test.questions = [];
      this.getQuestionsTestWise(test);
    }
    resolve(true);
  });
});
}

getAttemptedTestOfUser(){
  return new Promise((resolve) => {
  var data = this._getService.getAttemptedTestOfUser(localStorage.getItem('userId'));
  data.subscribe((res:IAttemptedTest[]) => {
    this.attemptedTests = res;
    resolve(true);
  });
});
}

getQuestionsTestWise(test){
  var data = this._getService.getAllQuestionsOfTest(test._id);
  data.subscribe((res:IQuestion[]) => {
    test.questions = res;
    test.questionsLoaded = true;
    test.status = "Untouched";
    for(let attemptedTest of this.attemptedTests){
      if(attemptedTest.testId == test._id){
        test.status = attemptedTest.status;
        test.attemptId = attemptedTest._id;
        test.secLeft = attemptedTest.timeLeft;
        var start = 0;
        for(let question of test.questions){
            question.candidateAnswer = attemptedTest.answers[start++];
            if(question.candidateAnswer){
              test.noOfQuesAttempted++;
            }

          }
      }
    }
    console.log(test);
  });
}


  attempt(test){
    let dataToPost = this.util.createAttemptedTest(test);
    let data = this._postService.addAttemptedTest(dataToPost);
    data.subscribe((res:IAttemptedTest) => {
      test.status = "In Progress";
      this.resume(test);
    });

  }
  resume(test){
    //this.util.createAttemptedTest(test._id,this.payload.limit);
    test.limit = test.questions.length;
    if(this.testType == "previous"){
      test.testMode = false;
    }
    if(this.testType == "mock"){
      test.testMode = true;
    }

    console.log("passing data to test page",test);
    this.navCtrl.push(TestPage,test);
  }

}
