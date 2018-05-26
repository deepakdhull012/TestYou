import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { IComment } from '../../interfaces/comment';
import { IReply } from '../../interfaces/reply';

import { GetService } from './../../services/get.service';
import { PostService } from './../../services/post.service';
import { PutService } from './../../services/put.service';


@Component({
  selector: 'page-replies',
  templateUrl: 'replies.html',
  providers: [PostService,GetService,PutService]
})
export class RepliesPage {

  tabBarElement:any;
  comment:IComment;
  userId : string = "";
  loginMode : string = "";
  replyResponse:any = {};
  replies: IReply[] = [];
  userAvatar : string = "";
  reply : IReply;
  replyContent : string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _postService: PostService,private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,private _getService: GetService,private _putService: PutService) {

      this.tabBarElement = document.querySelector('#tabs .tabbar');
      if(navParams.data){
        this.comment=navParams.data;
        console.log(this.comment);
      }
  }

  ionViewDidLoad() {
    this.userId = localStorage.getItem('userId');
    this.loginMode = localStorage.getItem('loginMode');
    this.userAvatar = localStorage.getItem('userImage');
  }
  ionViewDidEnter(){
    this.getAllRepliesOfComment(this.comment._id);
  }
  ionViewWillEnter(){
    this.tabBarElement.style.display = 'none';
  }
    ionViewWillLeave(){
    this.tabBarElement.style.display = 'flex';
  }
  postReply(replyContent){
    return new Promise((resolve) => {

    var dataToPost = JSON.stringify({commentId:this.comment._id,userId:this.userId,
    content:replyContent,likes:0,
    loginModeWhileReplying:this.loginMode
    });
    var data = this._postService.addReply(dataToPost);
    data.subscribe((res:IReply) => {
      this.replyResponse=res;
      if(this.replyResponse){
        this._putService.replyPosted(this.comment._id).subscribe((res:any)=>{});
        this.replies.push(this.replyResponse);
        this.replyContent = "";
        resolve(true);
      }
      else{
        resolve(false);
      }
    });
  });
  }

  getAllRepliesOfComment(commentId){

    var data = this._getService.getAllRepliesOfComment(commentId);
    data.subscribe((res:IReply[]) => {
      this.replies = res;
      this.replies.map((reply)=>{
        if(reply.loginModeWhileReplying == 'gmail'){
          var data = this._getService.getUserGmailImage(reply.userId);
          data.subscribe((res:any) => {
            reply.replierImage = res.gmailImage;
            reply.replierName = res.userName;
          });
        }
        else if(reply.loginModeWhileReplying == 'facebook'){
          var data = this._getService.getUserFacebookImage(reply.userId);
          data.subscribe((res:any) => {
            reply.replierImage = res.facebookImage;
            reply.replierName = res.userName;
          });
        }
        else{
          var data = this._getService.getUserNormalImage(reply.userId);
          data.subscribe((res:any) => {
            reply.replierImage = res.uploadedImage;
            reply.replierName = res.userName;
          });
        }
      })

    })
  }

  like(comment){
    var likeEntryComment = JSON.stringify({likedBy:this.userId,commentId:comment._id});
    if(comment.likedByme){
      comment.likes--;
      this._putService.commentDisliked(comment._id).subscribe((res:any) =>{});
      this._postService.removeFromLikedEntryComment(likeEntryComment).subscribe((res:any) => {});
    }
    else{
      comment.likes++;
      this._putService.commentLiked(comment._id).subscribe((res:any) =>{});
      this._postService.addToLikedEntryComment(likeEntryComment).subscribe((res:any) => {});
    }
    comment.likedByme = !comment.likedByme;
  }

  presentLoadingDefault(content) {
  let loading = this.loadingCtrl.create({
    content: 'Posting the reply...'
  });
  loading.present();
  this.postReply(content).then((replyResponse) => {
        if (replyResponse){

        }
        else{
          //this.presentAlertFailed();
        }
         loading.dismiss();
    });
  }



}
