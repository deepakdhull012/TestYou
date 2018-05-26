import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { GetService } from './../../services/get.service';
import { UtilService } from './../../services/util.service';
import { ISubject } from '../../interfaces/subject';
import { IChapter } from '../../interfaces/chapter';
import { IQuestion } from '../../interfaces/question';
import { TestCustomizerPage } from '../../pages/test-customizer/test-customizer';
import { TopicsPage } from '../../pages/topics/topics';


/**
 * Generated class for the SubjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-subject',
  templateUrl: 'subject.html',
  providers: [GetService,UtilService]
})
export class SubjectPage {

  subjectList:ISubject[] = [];
  chapterList:IChapter[]=[];
  questionList:IQuestion[] = [];
  subjectsLoaded:boolean = false;
  chaptersLoaded:boolean = false;
  questionsLoaded:boolean = false;
  state = 'inactive';
  payloadTest:any = {};
  payloadTopic:any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _getService: GetService,private util:UtilService) {
  }

  ionViewDidLoad() {
    this.loadContent();
  }

  getAllSubjects(){
    return new Promise((resolve) => {
      var data = this._getService.getAllSubjects();
      data.subscribe((res:ISubject[]) => {
        this.subjectList=res;
        resolve(true);
      },
      err => {
        console.log(err);
        resolve(false);
          });
        });
      }

      getAllChapters(){
        return new Promise((resolve) => {
          var data = this._getService.getAllChapters();
          data.subscribe((res:IChapter[]) => {
            this.chapterList=res;
            resolve(true);
          },
          err => {
            console.log(err);
            resolve(false);
              });
        });
    }
    getAllQuestions(){
      return new Promise((resolve) => {
    var data = this._getService.getAllQuestions();
    data.subscribe((res:IQuestion[]) => {
      this.questionList=res;
      resolve(true);
      console.log(this.questionList.length);
    },
    err => {
      console.log(err);
      resolve(false);
    });
  });
    }

      toggleChapters(subject){
        this.state = this.state === 'inactive' ? 'active' : 'inactive';
        subject.isChapterVisible = !subject.isChapterVisible;
      }

      goToTopics(chapter){
        this.payloadTopic.questions = this.questionList;
        this.payloadTopic.chapter = chapter;
        this.navCtrl.push(TopicsPage,this.payloadTopic);
      }
      getQuestionOfCurrentSubject(subject){
          subject.questionList = this.questionList.filter(
                  question => question.subjectId === subject._id);

      }
      getQuestionOfCurrentChapter(chapter){
          chapter.questionList = this.questionList.filter(
                  question => question.chapterId === chapter._id);
      }


      gotoSubjectTestMode(subject){
        this.payloadTest.questions = subject.questionList;
        this.payloadTest.subject = subject;
        this.payloadTest.mode = 1;
        this.navCtrl.push(TestCustomizerPage,this.payloadTest);
      }
      gotoChapterTestMode(chapter){
        this.payloadTest.questions = chapter.questionList;
        this.payloadTest.chapter = chapter;
        this.payloadTest.mode = 2;
        this.navCtrl.push(TestCustomizerPage,this.payloadTest);
      }



    loadContent(){
      var loading = this.util.displayLoading("Please wait loading subjects..");
      this.getAllChapters().then((loaded) => {
        this.chaptersLoaded = true;
        if(this.subjectsLoaded){
          loading.dismiss();
        }
        if(this.questionsLoaded){
          for(let chp of this.chapterList){
            this.getQuestionOfCurrentChapter(chp);
          }
        }
      });
      this.getAllSubjects().then((loaded) => {
          this.subjectsLoaded = true;
          console.log("Questions loaded: "+this.questionsLoaded)
          if(this.chaptersLoaded){
            loading.dismiss();
            if(this.questionsLoaded){
              for(let sub of this.subjectList){
                this.getQuestionOfCurrentSubject(sub);
              }
            }

          }
      });
      this.getAllQuestions().then((loaded)=>{
        this.questionsLoaded = true;
        console.log("Subject loaded: "+this.subjectsLoaded);
        if(this.subjectsLoaded){
          for(let sub of this.subjectList){
            this.getQuestionOfCurrentSubject(sub);
          }
        }
        if(this.chaptersLoaded){
          for(let chp of this.chapterList){
            this.getQuestionOfCurrentChapter(chp);
          }
        }
      });
    }
}
