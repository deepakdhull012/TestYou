import { Injectable } from '@angular/core';

import { Http, Headers, Response } from '@angular/http';

import { IUser } from './../interfaces/user';
import { ISubject } from './../interfaces/subject';
import { IChapter } from './../interfaces/chapter';
import { ITopic } from './../interfaces/topic';
import { IQuestion } from './../interfaces/question';
import { ILikedEntry } from './../interfaces/likedEntry';
import { ILikedEntryComments } from './../interfaces/likedEntryComments';
import { IPost } from './../interfaces/post';
import { IComment } from './../interfaces/comment';
import { IReply } from './../interfaces/reply';
import { IPayment } from './../interfaces/payment';
import { IAttemptedTest } from './../interfaces/attemptedTests';
import { IChatRoom } from './../interfaces/chatRoom';


import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class PostService {

  constructor(private _http: Http){}
  private _postUserNormalUrl = 'https://agile-inlet-67707.herokuapp.com/api/users/normal/';
  private _postUserSocialUrl = 'https://agile-inlet-67707.herokuapp.com/api/users/social/';
  private _loginUserUrl='https://agile-inlet-67707.herokuapp.com/api/login';
  private _SubjectUrl='https://agile-inlet-67707.herokuapp.com/api/subjects';
  private _ChapterUrl='https://agile-inlet-67707.herokuapp.com/api/chapters';
  private _TopicUrl='https://agile-inlet-67707.herokuapp.com/api/topics';
  private _QuestionUrl='https://agile-inlet-67707.herokuapp.com/api/questions';
  private _NormalPostUrl='https://agile-inlet-67707.herokuapp.com/api/normalPosts';
  private _likeEntryUrl='https://agile-inlet-67707.herokuapp.com/api/mapping/likedPosts/';
  private _dislikeEntryUrl='https://agile-inlet-67707.herokuapp.com/api/mapping/dislikedPosts/';
  private _likeEntryCommentUrl='https://agile-inlet-67707.herokuapp.com/api/mappingComment/likedComments/';
  private _dislikeEntryCommentUrl='https://agile-inlet-67707.herokuapp.com/api/mappingComment/dislikedComments/';
  private _CommentUrl = 'https://agile-inlet-67707.herokuapp.com/api/comments/';
  private _ReplyUrl = 'https://agile-inlet-67707.herokuapp.com/api/replies/';
  private _paymentUrl = 'https://agile-inlet-67707.herokuapp.com/api/payment/';
  private _PostAttemptedTestUrl = 'https://agile-inlet-67707.herokuapp.com/api/attemptedTests/';
  private _ChatRoomUrl = 'https://agile-inlet-67707.herokuapp.com/api/chatRooms/';

//http://localhost:5000

   addUserNormal(dataToPost):Observable<IUser>{
     var headers = new Headers();
     headers.append('Content-Type', 'application/json');
      return this._http.post(this._postUserNormalUrl,dataToPost,{headers:headers})
      .map((response: Response) => <IUser> response.json())
      .do(data => console.log(JSON.stringify(data)));
}

pay(paymentData):Observable<any>{
  console.log(paymentData)
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
   return this._http.post(this._paymentUrl,paymentData,{headers:headers})
   .map((response: Response) => <any> response.json());

}

addUserSocial(dataToPost):Observable<IUser>{
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
   return this._http.post(this._postUserSocialUrl,dataToPost,{headers:headers})
   .map((response: Response) => <IUser> response.json())
   .do(data => console.log(JSON.stringify(data)));
}

addSubject(dataToPost):Observable<ISubject>{
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
   return this._http.post(this._SubjectUrl,dataToPost,{headers:headers})
   .map((response: Response) => <ISubject> response.json())
   .do(data => console.log(JSON.stringify(data)));
}
addChapterToSubject(dataToPost):Observable<IChapter>{
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
   return this._http.post(this._ChapterUrl,dataToPost,{headers:headers})
   .map((response: Response) => <IChapter> response.json())
   .do(data => console.log(JSON.stringify(data)));
}
addTopicsToChapter(dataToPost):Observable<ITopic>{
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
   return this._http.post(this._TopicUrl,dataToPost,{headers:headers})
   .map((response: Response) => <ITopic> response.json())
   .do(data => console.log(JSON.stringify(data)));
}
addQuestionsToTopic(dataToPost):Observable<IQuestion>{
  var headers = new Headers();
  console.log("service: "+dataToPost);
  headers.append('Content-Type', 'application/json');
   return this._http.post(this._QuestionUrl,dataToPost,{headers:headers})
   .map((response: Response) => <IQuestion> response.json())
   .do(data => console.log(JSON.stringify(data)));
}
  loginUser(dataToPost):Observable<IUser>{
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
     return this._http.post(this._loginUserUrl,dataToPost,{headers:headers})
     .map((response: Response) => <IUser> response.json())
     .do(data => console.log(JSON.stringify(data)));
}
  addPost(dataToPost):Observable<IPost>{
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
     return this._http.post(this._NormalPostUrl,dataToPost,{headers:headers})
     .map((response: Response) => <IPost> response.json())
     .do(data => console.log(JSON.stringify(data)));
  }

  addComment(commentToPost):Observable<IComment>{
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
     return this._http.post(this._CommentUrl,commentToPost,{headers:headers})
     .map((response: Response) => <IComment> response.json())
     .do(data => console.log(JSON.stringify(data)));
  }

  addReply(replyToPost):Observable<IReply>{
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
     return this._http.post(this._ReplyUrl,replyToPost,{headers:headers})
     .map((response: Response) => <IReply> response.json())
     .do(data => console.log(JSON.stringify(data)));
  }


  addToLikedEntry(dataToPost):Observable<ILikedEntry>{
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
     return this._http.post(this._likeEntryUrl,dataToPost,{headers:headers})
     .map((response: Response) => <ILikedEntry> response.json())
     .do(data => {});
  }

  removeFromLikedEntry(dataToPost):any{

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
     return this._http.post(this._dislikeEntryUrl,dataToPost,{headers:headers})
     .map((response: Response) =>  response.json())
     .do(data => {

     });
  }

  addToLikedEntryComment(dataToPost):Observable<ILikedEntryComments>{
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
     return this._http.post(this._likeEntryCommentUrl,dataToPost,{headers:headers})
     .map((response: Response) => <ILikedEntryComments> response.json())
     .do(data => {});
  }

  removeFromLikedEntryComment(dataToPost):any{
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
     return this._http.post(this._dislikeEntryCommentUrl,dataToPost,{headers:headers})
     .map((response: Response) =>  response.json())
     .do(data => {

     });
  }
  addAttemptedTest(dataToPost):Observable<IAttemptedTest>{
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
     return this._http.post(this._PostAttemptedTestUrl,dataToPost,{headers:headers})
     .map((response: Response) =>  response.json())
     .do(data => {});
  }
  createChatRoom(dataToPost):Observable<IChatRoom>{
    console.log(dataToPost);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
     return this._http.post(this._ChatRoomUrl,dataToPost,{headers:headers})
     .map((response: Response) =>  response.json())
     .do(data => {});
  }







}
