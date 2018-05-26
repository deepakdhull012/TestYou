import { LoadingController,ToastController,AlertController } from 'ionic-angular';

import { Injectable } from '@angular/core';



@Injectable()
export class UtilService {

  constructor(private toastCtrl: ToastController,public loadingCtrl: LoadingController){

  }

  displayToast(msg) {
      let toast = this.toastCtrl.create({
      message: "Press back to exit",
      duration: 3000,
      position: "bottom"
    });
    toast.present();
  }

  displayLoading(msg){
    let loading = this.loadingCtrl.create({
      content: 'Loading Please wait...'
    });
    loading.present();
    return loading;
  }
  createAttemptedTest(test){
    var attemptedTest :any = {};
    var userId = localStorage.getItem('userId');
    var answers = [];
    for(let i=0;i<test.questions.length;i++){
      answers.push(null);
    }
    attemptedTest.testId = test._id;
    attemptedTest.userId = userId;
    attemptedTest.answers = answers;
    attemptedTest.status = "In Progress";
    attemptedTest.testName = test.testName;
    attemptedTest.testType = test.testType;
    attemptedTest.forYear = test.forYear;
    attemptedTest.totalQuestions = test.questions.length;
    attemptedTest.timeLeft = test.questions.length*60;


    return attemptedTest;

  }


}
