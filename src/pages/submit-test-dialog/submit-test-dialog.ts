import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import {Observable} from 'rxjs/Observable'

/**
 * Generated class for the SubmitTestDialogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-submit-test-dialog',
  templateUrl: 'submit-test-dialog.html',
})
export class SubmitTestDialogPage {
  attemptedQuestions:number;
  unAttemptedQuestions:number;
  questionsToReview:number;
  secLeft:number;
  timeLeft:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
    if(navParams.data){
      console.log(navParams.data);
      this.attemptedQuestions = navParams.data.attemptedQuestions;
      this.unAttemptedQuestions = navParams.data.unAttemptedQuestions;
      this.questionsToReview = navParams.data.questionsToReview;
      this.secLeft = navParams.data.timeLeft;
      const start = this.secLeft;
      Observable.timer(0,1000)
        .map(i => start - i)
        .take(start + 1)
        .subscribe(i =>{
          var date = new Date(null);
          date.setSeconds(i);
          this.timeLeft = date.toISOString().substr(11,8);

        });
    }
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SubmitTestDialogPage');
  }
  submit(tobeSubmit)
  {
    this.viewCtrl.dismiss(tobeSubmit);
  }

}
