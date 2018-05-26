import { IQuestion } from './question';

export interface IChapter {
  _id:string,
  examId:string,
  subjectId:string,
  chapterName:string,
  noOfTopics:number,
  isChecked:boolean,
  questionList:IQuestion[];
}
