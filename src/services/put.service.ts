import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { IQuestion } from './../interfaces/question';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { IPost } from './../interfaces/post';
import { IComment } from './../interfaces/comment';
import { IAttemptedTest } from './../interfaces/attemptedTests';


@Injectable()
export class PutService {

  constructor(private _http: Http){}

  private _QuestionUrl='https://agile-inlet-67707.herokuapp.com/api/questions/';
  private _PostLikedUrl='https://agile-inlet-67707.herokuapp.com/api/normalPosts/like/';
  private _PostDislikedUrl='https://agile-inlet-67707.herokuapp.com/api/normalPosts/dislike/';
  private _CommentLikedUrl='https://agile-inlet-67707.herokuapp.com/api/comments/like/';
  private _CommentDislikedUrl='https://agile-inlet-67707.herokuapp.com/api/comments/dislike/';
  private _CommentPostedUrl='https://agile-inlet-67707.herokuapp.com/api/normalPosts/commentPosted/';
  private _CommentDeletedUrl='https://agile-inlet-67707.herokuapp.com/api/normalPosts/commentDeleted/';
  private _ReplyPostedUrl = 'https://agile-inlet-67707.herokuapp.com/api/comments/replyPosted/';
  private _ReplyDeletedUrl = 'https://agile-inlet-67707.herokuapp.com/api/comments/replyDeleted/';
  private _AttemptedTestUpdateQuestionUrl = 'https://agile-inlet-67707.herokuapp.com/api/attemptedTests/questionAttempted/';

//http://localhost:5000

   questionAttempted(questionId,dataToPost):Observable<IQuestion>{
     var headers = new Headers();
     headers.append('Content-Type', 'application/json');
      return this._http.put(this._QuestionUrl+questionId,dataToPost,{headers:headers})
      .map((response: Response) =>  response.json())
      .do(data => console.log(JSON.stringify(data)));
}

postLiked(postId):Observable<IPost>{
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
   return this._http.put(this._PostLikedUrl+postId,{headers:headers})
   .map((response: Response) =>  response.json())
   .do(data => console.log(JSON.stringify(data)));
}
postDisliked(postId):Observable<IPost>{
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
   return this._http.put(this._PostDislikedUrl+postId,{headers:headers})
   .map((response: Response) =>  response.json())
   .do(data => console.log(JSON.stringify(data)));
}

commentLiked(commentId):Observable<IComment>{
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
   return this._http.put(this._CommentLikedUrl+commentId,{headers:headers})
   .map((response: Response) =>  response.json())
   .do(data => console.log(JSON.stringify(data)));
}
commentDisliked(commentId):Observable<IComment>{
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
   return this._http.put(this._CommentDislikedUrl+commentId,{headers:headers})
   .map((response: Response) =>  response.json())
   .do(data => console.log(JSON.stringify(data)));
}



commentPosted(postId):Observable<IPost>{
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
   return this._http.put(this._CommentPostedUrl+postId,{headers:headers})
   .map((response: Response) =>  response.json())
   .do(data => console.log(JSON.stringify(data)));
}

commentDeleted(postId):Observable<IPost>{
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
   return this._http.put(this._CommentDeletedUrl+postId,{headers:headers})
   .map((response: Response) =>  response.json())
   .do(data => console.log(JSON.stringify(data)));
}

replyPosted(commentId):Observable<IComment>{
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
   return this._http.put(this._ReplyPostedUrl+commentId,{headers:headers})
   .map((response: Response) =>  response.json())
   .do(data => console.log(JSON.stringify(data)));
}

replyDeleted(commentId):Observable<IComment>{
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
   return this._http.put(this._ReplyDeletedUrl+commentId,{headers:headers})
   .map((response: Response) =>  response.json())
   .do(data => console.log(JSON.stringify(data)));
}
updateAttemptedTest(dataToPost):Observable<IAttemptedTest>{
  console.log("in service call fn");
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
   return this._http.put(this._AttemptedTestUpdateQuestionUrl,dataToPost,{headers:headers})
   .map((response: Response) =>  response.json())
   .do(data => console.log(JSON.stringify(data)));
}


}
