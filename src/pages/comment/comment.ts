import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';

import { IPost } from '../../interfaces/post';
import { IComment } from '../../interfaces/comment';
import { ILikedEntry } from '../../interfaces/likedEntry';
import { ILikedEntryComments } from '../../interfaces/likedEntryComments';


import { GetService } from './../../services/get.service';
import { PostService } from './../../services/post.service';
import { PutService } from './../../services/put.service';



@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
  providers: [PostService,GetService,PutService]
})
export class CommentPage {
  tabBarElement:any;
  post:IPost;
  userId : string = "";
  loginMode : string = "";
  commentResponse:any = {};
  comments: IComment[] = [];
  userAvatar : string = "";
  comment : IComment;
  commentContent : string = "";
  likedEntryList:ILikedEntryComments[] = [];
  likedEntriesLoaded: boolean = false;
  commentsLoaded: boolean = false;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _postService: PostService,private alertCtrl: AlertController,
  public loadingCtrl: LoadingController,private _getService: GetService,private _putService: PutService) {
    this.tabBarElement = document.querySelector('#tabs .tabbar');
    if(navParams.data){
      this.post=navParams.data;
    }
  }

  ionViewDidLoad() {
    this.userId = localStorage.getItem('userId');
    this.loginMode = localStorage.getItem('loginMode');
    this.userAvatar = localStorage.getItem('userImage');
  }
  ionViewDidEnter(){
    this.getAllCommentsOfPost(this.post._id);
    this.getLikedEntryCommentList();

  }
  ionViewWillEnter(){
        this.tabBarElement.style.display = 'none';
    }
    ionViewWillLeave(){
        this.tabBarElement.style.display = 'flex';
    }
    postComment(commentContent){
      return new Promise((resolve) => {

      var dataToPost = JSON.stringify({postId:this.post._id,userId:this.userId,
      content:commentContent,likes:0,replies:0,
      loginModeWhileCommenting:this.loginMode
      });
      var data = this._postService.addComment(dataToPost);
      data.subscribe((res:IComment) => {
        this.commentResponse=res;
        if(this.commentResponse){
          this._putService.commentPosted(this.post._id).subscribe((res:any)=>{});
          this.comments.push(this.commentResponse);
          this.commentContent = "";
          resolve(true);
        }
        else{
          resolve(false);
        }
      });
    });
    }

    getAllCommentsOfPost(postId){

      var data = this._getService.getAllCommentsOfPost(postId);
      data.subscribe((res:IComment[]) => {
        this.comments = res;
        this.comments.map((comment)=>{
          if(comment.loginModeWhileCommenting == 'gmail'){
            var data = this._getService.getUserGmailImage(comment.userId);
            data.subscribe((res:any) => {
              comment.commenterImage = res.gmailImage;
              comment.commenterName = res.userName;
            });
          }
          else if(comment.loginModeWhileCommenting == 'facebook'){
            var data = this._getService.getUserFacebookImage(comment.userId);
            data.subscribe((res:any) => {
              comment.commenterImage = res.facebookImage;
              comment.commenterName = res.userName;
            });
          }
          else{
            var data = this._getService.getUserNormalImage(comment.userId);
            data.subscribe((res:any) => {
              comment.commenterImage = res.uploadedImage;
              comment.commenterName = res.userName;
            });
          }
        })

      })
    }

    like(post){
      var likeEntry = JSON.stringify({likedBy:this.userId,postId:post._id});
      if(post.likedByme){
        post.likes--;
        this._putService.postDisliked(post._id).subscribe((res:any) =>{});
        this._postService.removeFromLikedEntry(likeEntry).subscribe((res:any) => {});
      }
      else{
        post.likes++;
        this._putService.postLiked(post._id).subscribe((res:any) =>{});
        this._postService.addToLikedEntry(likeEntry).subscribe((res:any) => {});
      }
      post.likedByme = !post.likedByme;
    }

    getLikedEntryCommentList(){
      var data = this._getService.getLikedEntryCommentList(this.userId);
      data.subscribe((res:ILikedEntryComments[]) => {
        this.likedEntriesLoaded = true;
        this.likedEntryList = res;
        if(this.commentsLoaded){
          this.map(this.likedEntryList,this.comments);
        }
      });
    }

    map(entryList,comments){
      console.log("list"+entryList);
      for(let comment of comments){
        for(let entry of entryList){
          if(comment._id == entry.commentId){
            comment.likedByme = true;
            break;
          }
        }
      }
    }


    presentLoadingDefault(content) {
    let loading = this.loadingCtrl.create({
      content: 'Posting the comment...'
    });
    loading.present();
    this.postComment(content).then((commentResponse) => {
          if (commentResponse){

          }
          else{
            //this.presentAlertFailed();
          }
           loading.dismiss();
      });
    }

}
