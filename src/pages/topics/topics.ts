import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController} from 'ionic-angular';

import { GetService } from './../../services/get.service';
import { TestPage } from '../../pages/test/test';
import { ITopic } from '../../interfaces/topic';
import { IQuestion } from '../../interfaces/question';



/**
 * Generated class for the TopicsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-topics',
  templateUrl: 'topics.html',
  providers: [GetService]
})
export class TopicsPage {
  chapter:any;
  topicList:ITopic[];
  loading:any;
  payload:any = {};
  questionList:IQuestion[] = [];
  questionListOfCurrent:IQuestion[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,private _getService: GetService,public loadingCtrl: LoadingController) {
    if(navParams.data){
      this.chapter=navParams.data.chapter;
      this.questionList = navParams.data.questions;
    }
  }

  ionViewDidLoad() {
    this.presentLoadingDefault();
  }
  ionViewWillEnter() {

    }
    getAllTopics(){
      return new Promise((resolve) => {
    var data = this._getService.getAllTopicsOfChapter(this.chapter._id);
    data.subscribe((res:ITopic[]) => {
      this.topicList=res;
      resolve(true);
    });
  });
  }
  goToQuestions(topic){
    this.applyFilter(topic._id);
    this.payload.questions = this.questionListOfCurrent;
    this.payload.testMode = false;
    this.navCtrl.push(TestPage,this.payload);
    console.log(this.payload+" passed rom topic page")
  }
  applyFilter(id){
      this.questionListOfCurrent = this.questionList.filter(
              question => question.topicId === id);

  }
  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Loading Please wait...'
    });
    loading.present();
    this.getAllTopics().then((loaded) => {
           loading.dismiss();
      });

  }
}
