import { Component } from '@angular/core';
import { NavController,Platform,MenuController,Events } from 'ionic-angular';



import { GetService } from './../../services/get.service';
import { UtilService } from './../../services/util.service';


import { IExam } from '../../interfaces/exam';
import { IQuestion } from '../../interfaces/question';
import { ISubject } from '../../interfaces/subject';

import { ChaptersPage } from '../../pages/chapters/chapters';
import { SubjectPage } from '../../pages/subject/subject';
import { TestCustomizerPage } from '../../pages/test-customizer/test-customizer';
import { NewsFeedPage } from '../../pages/news-feed/news-feed';
import { TestListPage } from '../../pages/test-list/test-list';
import { VideoPlayerPage } from '../../pages/video-player/video-player';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [GetService,UtilService],
})

export class HomePage {


  state = 'inactive';
  loading:any = {};
  payload:any = {};
  questionList:IQuestion[] = [];
  questionListOfCurrent:IQuestion[];
  navigator: any;
  Connection: any;
  alert:any = {};
  public counter=0;


  constructor(public navCtrl: NavController,private _getService: GetService,private platform: Platform,
    private util:UtilService,public menu:MenuController,public events: Events) {
      localStorage.setItem('postsLoaded', 'false');
    this.payload = {};
    this.platform.pause.subscribe(e => {
      localStorage.setItem('postsLoaded', 'false');
    });
    this.platform.ready().then(() => {

      this.platform.registerBackButtonAction(() => {
        if (navCtrl.canGoBack()) { // CHECK IF THE USER IS IN THE ROOT PAGE.
      navCtrl.pop(); // IF IT'S NOT THE ROOT, POP A PAGE.
    } else {
    if (this.counter == 0) {
      this.counter++;
      this.util.displayToast("Press again to Exit.");
      setTimeout(() => { this.counter = 0 }, 3000)
    } else {
      // console.log("exitapp");
      this.platform.exitApp();
    }
    }

    });
  });
  }






  ionViewDidLoad() {

  }
  ionViewWillEnter() {

    }

    toggleSubjects(exam){
      this.state = this.state === 'inactive' ? 'active' : 'inactive';
      exam.isSubjectVisible = !exam.isSubjectVisible;
    }
    goToChapters(subject){
      this.applyFilter(subject._id);
      this.payload.questions = this.questionListOfCurrent;
      this.payload.subject = subject;
      this.navCtrl.push(ChaptersPage,this.payload);
}
gotoSubjectTestMode(subject){
  this.applyFilter(subject._id);
  this.payload.questions = this.questionListOfCurrent;
  this.payload.subject = subject;
  this.payload.mode = 1;
  this.navCtrl.push(TestCustomizerPage,this.payload);
}
gotoMockTestPage(){
  this.navCtrl.push(TestListPage,"mock");
}
gotoPreviousYearTestPage(){
  this.navCtrl.push(TestListPage,"previous");
}
goToSubjectpage(){
  this.navCtrl.push(SubjectPage);
}
goToVideos(){
  this.navCtrl.push(VideoPlayerPage);
}
applyFilter(id){
    this.questionListOfCurrent = this.questionList.filter(
            question => question.subjectId === id);
}

ionViewDidEnter(){}
}
