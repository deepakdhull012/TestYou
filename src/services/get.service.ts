import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IExam } from './../interfaces/exam';
import { ISubject } from './../interfaces/subject';
import { IChapter } from './../interfaces/chapter';
import { ITopic } from './../interfaces/topic';
import { IQuestion } from './../interfaces/question';
import { IPost } from './../interfaces/post';
import { ITest } from './../interfaces/test';
import { IUser } from './../interfaces/user';
import { IAttemptedTest } from './../interfaces/attemptedTests';
import { IMessage } from './../interfaces/message';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';


@Injectable()
export class GetService {
  constructor(private _http: Http){}

  private _ExamUrl='https://agile-inlet-67707.herokuapp.com/api/exams/';
  private _SubjectUrl='https://agile-inlet-67707.herokuapp.com/api/subjects/';
  private _ChapterUrl='https://agile-inlet-67707.herokuapp.com/api/chapters/';
  private _TopicUrl='https://agile-inlet-67707.herokuapp.com/api/topics/';
  private _QuestionUrl='https://agile-inlet-67707.herokuapp.com/api/questions/';
  private _NormalPostUrl='https://agile-inlet-67707.herokuapp.com/api/normalPosts/';
  private _gmailImageUrl='https://agile-inlet-67707.herokuapp.com/api/image/gmail/';
  private _facebookImageUrl='https://agile-inlet-67707.herokuapp.com/api/image/facebook/';
  private _uploadedImageUrl='https://agile-inlet-67707.herokuapp.com/api/image/uploaded/';
  private _likeEntryUrl='https://agile-inlet-67707.herokuapp.com/api/mapping/likedPosts/';
  private _likeEntryCommentUrl='https://agile-inlet-67707.herokuapp.com/api/mappingComment/likedComments/';
  private _commentUrl = 'https://agile-inlet-67707.herokuapp.com/api/comments/';
  private _replyUrl = 'https://agile-inlet-67707.herokuapp.com/api/replies/';
  private _MockTestUrl = 'https://agile-inlet-67707.herokuapp.com/api/tests/mock/';
  private _PreviousYearTestUrl = 'https://agile-inlet-67707.herokuapp.com/api/tests/previous/';
  private _GetAttemptedTestUrl = 'https://agile-inlet-67707.herokuapp.com/api/attemptedTests/user/';
  private _UserInfoUrl = 'https://agile-inlet-67707.herokuapp.com/api/users/';
  private _MessagesUrl = 'https://agile-inlet-67707.herokuapp.com/api/messages/';

  //http://localhost:5000/

  getAllExams():Observable<IExam[]>{
     return this._http.get(this._ExamUrl)
     .map((response: Response) => <IExam[]> response.json());
     //.do(data => console.log(JSON.stringify(data)));
  }
  getAllSubjects():Observable<ISubject[]>{
     return this._http.get(this._SubjectUrl)
     .map((response: Response) => <ISubject[]> response.json());
     //.do(data => console.log(JSON.stringify(data)));
}
getAllChapters():Observable<IChapter[]>{
   return this._http.get(this._ChapterUrl)
   .map((response: Response) => <IChapter[]> response.json());
  // .do(data => console.log(JSON.stringify(data)));
}
getAllChaptersOfSubject(subjectId):Observable<IChapter[]>{
   return this._http.get(this._ChapterUrl+"ofSubject/"+subjectId)
   .map((response: Response) => <IChapter[]> response.json());
  // .do(data => console.log(JSON.stringify(data)));
}
getAllTopicsOfSubject(subjectId):Observable<ITopic[]>{
   return this._http.get(this._TopicUrl+"ofSubject/"+subjectId)
   .map((response: Response) => <ITopic[]> response.json());
   //.do(data => console.log(JSON.stringify(data)));
}
getAllTopicsOfChapter(chapterId):Observable<ITopic[]>{
   return this._http.get(this._TopicUrl+"ofChapter/"+chapterId)
   .map((response: Response) => <ITopic[]> response.json());
   //.do(data => console.log(JSON.stringify(data)));
}
getAllQuestionsOfTopic(topicId):Observable<IQuestion[]>{
   return this._http.get(this._QuestionUrl+"topic/"+topicId)
   .map((response: Response) => <IQuestion[]> response.json());
   //.do(data => console.log(JSON.stringify(data)));
}
getAllQuestionsOfTest(testId):Observable<IQuestion[]>{
   return this._http.get(this._QuestionUrl+"ofTest/"+testId)
   .map((response: Response) => <IQuestion[]> response.json());
   //.do(data => console.log(JSON.stringify(data)));
}
getAllQuestionsOfSubject(subjectId):Observable<IQuestion[]>{
   return this._http.get(this._QuestionUrl+"subject/"+subjectId)
   .map((response: Response) => <IQuestion[]> response.json());
   //.do(data => console.log(JSON.stringify(data)));
}
getAllMockTests():Observable<ITest[]>{
   return this._http.get(this._MockTestUrl)
   .map((response: Response) => <ITest[]> response.json());
}
getAllPreviousYearTests():Observable<ITest[]>{
   return this._http.get(this._PreviousYearTestUrl)
   .map((response: Response) => <ITest[]> response.json());
}
getAllQuestions():Observable<IQuestion[]>{
   return this._http.get(this._QuestionUrl)
   .map((response: Response) => <IQuestion[]> response.json());
   //.do(data => console.log(JSON.stringify(data)));
}

getAllPosts():Observable<IPost[]>{
   return this._http.get(this._NormalPostUrl)
   .map((response: Response) => <IPost[]> response.json());
   //.do(data => console.log(JSON.stringify(data)));
}

  getUserGmailImage(userId){
    return this._http.get(this._gmailImageUrl+userId)
    .map((response: Response) => response.json());
  }
  getUserFacebookImage(userId){
    return this._http.get(this._facebookImageUrl+userId)
    .map((response: Response) => response.json());
  }
  getUserNormalImage(userId){
    return this._http.get(this._uploadedImageUrl+userId)
    .map((response: Response) => response.json());
  }
  getLikedEntryList(userId){
    return this._http.get(this._likeEntryUrl+userId)
    .map((response: Response) => response.json());
  }
  getAllCommentsOfPost(postId){
    return this._http.get(this._commentUrl+postId)
    .map((response: Response) => response.json());
  }

  getLikedEntryCommentList(userId){
    return this._http.get(this._likeEntryCommentUrl+userId)
    .map((response: Response) => response.json());
  }
  getAllRepliesOfComment(commentId){
    return this._http.get(this._replyUrl+commentId)
    .map((response: Response) => response.json());
  }
  getAttemptedTestOfUser(userId):Observable<IAttemptedTest[]>{
     return this._http.get(this._GetAttemptedTestUrl+userId)
     .map((response: Response) => <IAttemptedTest[]> response.json());
     //.do(data => console.log(JSON.stringify(data)));
  }
  getUserInfoById(userId):Observable<IUser>{
     return this._http.get(this._UserInfoUrl+"id/"+userId)
     .map((response: Response) => <IUser> response.json());
     //.do(data => console.log(JSON.stringify(data)));
  }
  getMessagesByRoom(roomNo):Observable<IMessage[]>{
     return this._http.get(this._MessagesUrl+"room/"+roomNo)
     .map((response: Response) => <IMessage[]> response.json());
     //.do(data => console.log(JSON.stringify(data)));
  }


}
