import { Component } from '@angular/core';
import { NavController, NavParams, Events,AlertController,LoadingController } from 'ionic-angular';

import { GetService } from './../../services/get.service';
import { PostService } from './../../services/post.service';
import { NewsFeedPage } from '../../pages/news-feed/news-feed';

import { IPost } from '../../interfaces/post';
import { IExam } from '../../interfaces/exam';


@Component({
  selector: 'page-create-post',
  templateUrl: 'create-post.html',
  providers: [PostService,GetService]
})
export class CreatePostPage {
  tabBarElement:any;
  userData:any = {};
  post:any = {};
  examList:IExam[] = [];
  selectedExam:any = {};
  response:any = {};
  userId : string = "";
  loginMode : string = "";


  constructor(public navCtrl: NavController, public navParams: NavParams,public events: Events,
    private _postService: PostService,private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,private _getService: GetService) {
    this.tabBarElement = document.querySelector('#tabs .tabbar');
    events.subscribe('user:created', (userData) => {
      this.userData = userData;
  });
  }

  ionViewDidLoad() {
    this.userId = localStorage.getItem('userId');
    this.loginMode = localStorage.getItem('loginMode');
    this.getAllExams();

  }
  ionViewWillEnter(){
        this.tabBarElement.style.display = 'none';
    }
    ionViewWillLeave(){
        this.tabBarElement.style.display = 'flex';
    }
    createPost(content){
      return new Promise((resolve) => {
        if(!this.selectedExam.examName){
          this.selectedExam.examName = "All exams"
        }
        if(this.userId && this.loginMode){
      var dataToPost = JSON.stringify({examId:this.selectedExam.examName,createdBy:this.userId,
      postContent:content,hasApproved:false,likes:0,comments:0,shares:0,
      loginModeWhilePosting:this.loginMode
      });
      var data = this._postService.addPost(dataToPost);
      data.subscribe((res:IPost) => {
        this.response=res;
        if(this.response){
          resolve(true);
        }
        else{
          resolve(false);
        }
      });
    }
    });
    }

    getAllExams(){
    var data = this._getService.getAllExams();
    data.subscribe((res:IExam[]) => {
      this.examList=res;
    });
  }

    presentAlertFailed() {
    let alert = this.alertCtrl.create({
      title: 'Error..',
      subTitle: 'Failed to post..',
      buttons: ['Dismiss']
    });
    alert.present();
    }

    presentLoadingDefault(content) {
    let loading = this.loadingCtrl.create({
      content: 'Posting...'
    });
    loading.present();
    this.createPost(content).then((postUploadResponse) => {
          if (postUploadResponse){
              this.navCtrl.pop();
          }
          else{
            this.presentAlertFailed();
          }
           loading.dismiss();
      });
    }

}
