import { Component } from '@angular/core';
import { NavController, NavParams, Events} from 'ionic-angular';

import { CreatePostPage } from '../../pages/create-post/create-post';
import { CommentPage } from '../../pages/comment/comment';
import { ProfilePage } from '../../pages/profile/profile';

import { GetService } from './../../services/get.service';
import { PostService } from './../../services/post.service';
import { PutService } from './../../services/put.service';
import { UtilService } from './../../services/util.service';

import { IPost } from '../../interfaces/post';
import { ILikedEntry } from '../../interfaces/likedEntry';


@Component({
  selector: 'page-news-feed',
  templateUrl: 'news-feed.html',
  providers: [GetService,PostService,PutService,UtilService]
})
export class NewsFeedPage {
  userData:any = {};
  posts:IPost[] = [];
  likedEntryList:ILikedEntry[] = [];
  userId : string = "";
  userAvatar : string = "";
  postLoaded: boolean = false;
  likedEntriesLoaded: boolean = false;
  userName:string="";
  loginMode:string = "";


  constructor(public navCtrl: NavController, public navParams: NavParams,public events: Events,
    public _getService: GetService,public _postService: PostService,
    public _putService: PutService,private util:UtilService) {
    events.subscribe('user:created', (userData) => {
      this.userData = userData;
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsFeedPage');
    this.userId = localStorage.getItem('userId');
    this.userAvatar = localStorage.getItem('userImage');
    this.userName = localStorage.getItem('userName');
    this.loginMode = localStorage.getItem('loginMode');
  }
  ionViewDidEnter(){
      var loading = this.util.displayLoading("Please wait loading tests..");
      this.getAllPosts().then((loaded)=>{
        localStorage.setItem('postsLoaded', 'true');
        loading.dismiss();
      });
      this.getLikedEntryList().then((loaded)=>{

      });
  }
  goToCreatePost(){
    this.navCtrl.push(CreatePostPage);
  }
  getAllPosts(){
    return new Promise((resolve) => {
    var data = this._getService.getAllPosts();
    data.subscribe((res:IPost[]) => {
      this.posts=res;
      this.postLoaded = true;
      if(this.likedEntriesLoaded){
        this.map(this.likedEntryList,this.posts);
      }
      for(let post of this.posts)
      {
        if(post.loginModeWhilePosting == 'gmail'){
          var data = this._getService.getUserGmailImage(post.createdBy);
          data.subscribe((res:any) => {
            post.posterImage = res.gmailImage;
            post.posterName = res.userName;
          });
        }
        else if(post.loginModeWhilePosting == 'facebook'){
          var data = this._getService.getUserFacebookImage(post.createdBy);
          data.subscribe((res:any) => {
            post.posterImage = res.facebookImage;
            post.posterName = res.userName;
          });
        }
        else{
          var data = this._getService.getUserNormalImage(post.createdBy);
          data.subscribe((res:any) => {
            post.posterImage = res.uploadedImage;
            post.posterName = res.userName;
          });
        }
      }
      resolve(true);
    });
  });
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

getLikedEntryList(){
  return new Promise((resolve) => {
  var data = this._getService.getLikedEntryList(this.userId);
  data.subscribe((res:ILikedEntry[]) => {
    this.likedEntriesLoaded = true;
    this.likedEntryList = res;
    if(this.postLoaded){
      this.map(this.likedEntryList,this.posts);
    }
  });
  resolve(true);
});
}

map(entryList,posts){
  console.log("list"+entryList);
  for(let post of posts){
    for(let entry of entryList){
      if(post._id == entry.postId){
        post.likedByme = true;
        break;
      }
    }
  }
}


goToComments(post){
  this.navCtrl.push(CommentPage,post);
}
goToProfilePage(userId){
  this.navCtrl.push(ProfilePage,userId);
}


}
