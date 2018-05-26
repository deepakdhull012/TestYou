import { IQuestion } from './question';

export interface ISubject {
  _id:string,
  examId:string,
  subjectName:string,
  questionList:IQuestion[];
}
