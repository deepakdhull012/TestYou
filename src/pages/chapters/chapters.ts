import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,MenuController,ModalController} from 'ionic-angular';

import { GetService } from './../../services/get.service';
import { TestPage } from '../../pages/test/test';
import { TopicsPage } from '../../pages/topics/topics';
import { IChapter } from '../../interfaces/chapter';
import { ITopic } from '../../interfaces/topic';
import { IQuestion } from '../../interfaces/question';
import { HomePage } from '../../pages/home/home';
import { TestCustomizerPage } from '../../pages/test-customizer/test-customizer';
import { TopicWiseFilterPage } from '../../pages/topic-wise-filter/topic-wise-filter';


@Component({
  selector: 'page-chapters',
  templateUrl: 'chapters.html',
  providers: [GetService]
})
export class ChaptersPage {
  subject:any;
  chapterList:IChapter[]=[];
  topicList:ITopic[]=[];
  loading:any;
  payload:any = {};
  menuPayload:any = {};
  questionList:IQuestion[] = [];
  questionListOfCurrent:IQuestion[] = [];
  topicsLoaded:boolean = false;
  chaptersLoaded:boolean = false;


  constructor(public navCtrl: NavController, public navParams: NavParams,public menu:MenuController,
    public _getService: GetService,private loadingCtrl: LoadingController,public modalCtrl: ModalController) {
    if(navParams.data){
      this.subject=navParams.data.subject;
      this.questionList = navParams.data.questions;
    }
  }

  ionViewDidLoad() {
      this.presentLoadingDefault();
  }

  ionViewDidEnter(){

  }

  getAllChaptersOfSubject(){
return new Promise((resolve) => {
  var data = this._getService.getAllChaptersOfSubject(this.subject._id);
  data.subscribe((res:IChapter[]) => {
    this.chapterList=res;
    console.log('while loading'+this.chapterList.length);
    resolve(true);
  });
});
}
getAllTopicsOfSubject(){
  return new Promise((resolve) => {
var data = this._getService.getAllTopicsOfSubject(this.subject._id);
data.subscribe((res:ITopic[]) => {
  this.topicList=res;
  resolve(true);
});
});
}

countTopics(){
     this.chapterList.forEach(chapter => {
       chapter.noOfTopics = 0;
       this.topicList.forEach(topic => {
       if(chapter._id == topic.chapterId)
       {
         chapter.noOfTopics++;
       }

    });
  });
}

gotoChapterTestMode(chapter){
  this.applyFilter(chapter._id);
  this.payload.questions = this.questionListOfCurrent;
  this.payload.chapter = chapter;
  this.payload.mode = 2;
  this.navCtrl.push(TestCustomizerPage,this.payload);
}

goToTopics(chapter){
  this.applyFilter(chapter._id);
  this.payload.questions = this.questionListOfCurrent;
  this.payload.chapter = chapter;
  this.navCtrl.push(TopicsPage,this.payload);
}
applyFilter(id){
    this.questionListOfCurrent = this.questionList.filter(
            question => question.chapterId === id);
}
presentLoadingDefault() {
  let loading = this.loadingCtrl.create({
    content: 'Loading Please wait...'
  });
  loading.present();
  this.getAllChaptersOfSubject().then((loaded) =>{
    this.chaptersLoaded = true;
    if(this.topicsLoaded){
      this.countTopics();


    }
  });
  this.getAllTopicsOfSubject().then((loaded) => {
         this.topicsLoaded = true;
         if(this.chaptersLoaded){
           this.countTopics();
         }
         loading.dismiss();
    });
}

goToHome(){
  this.navCtrl.pop();
  this.navCtrl.push(HomePage);
}
goToTopicWiseFilter(){
      this.menuPayload.chapters = this.chapterList;
      this.menuPayload.topics = this.topicList;
      this.menuPayload.questions = this.questionList;

      let reviewModal = this.modalCtrl.create(TopicWiseFilterPage, this.menuPayload);
      reviewModal.present();
}

}
