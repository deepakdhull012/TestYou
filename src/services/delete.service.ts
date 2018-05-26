import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';


@Injectable()

export class DeleteService {

  constructor(private _http: Http){}

  private _deleteAllUsersUrl= 'https://agile-inlet-67707.herokuapp.com/api/users/';
  private _deleteAllSubjectsUrl='https://agile-inlet-67707.herokuapp.com/api/subjects/';
  private _deleteAllChaptersUrl='https://agile-inlet-67707.herokuapp.com/api/chapters/';
  private _deleteAllTopicsUrl='https://agile-inlet-67707.herokuapp.com/api/topics/';
  private _deleteAllQuestionsUrl='https://agile-inlet-67707.herokuapp.com/api/questions/';

//http://localhost:5000/
   removeAllUsers(){
      return this._http.delete(this._deleteAllUsersUrl)
      .do(data => data);
}
removeAllSubjects(){
   return this._http.delete(this._deleteAllSubjectsUrl)
   .do(data => data);
}
removeAllChaptersOfSubject(subjectId){
   return this._http.delete(this._deleteAllChaptersUrl+subjectId)
   .do(data => data);
}
removeAllTopicsOfChapter(chapterId){
   return this._http.delete(this._deleteAllTopicsUrl+chapterId)
   .do(data => data);
}
removeAllQuestionsOfTopic(topicId){
   return this._http.delete(this._deleteAllQuestionsUrl+topicId)
   .do(data => data);
}

}
