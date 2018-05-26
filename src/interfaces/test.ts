import { IQuestion } from './question';

export interface ITest {
  _id:string,
  attemptId:string,
  testName:string,
  forYear:number,
  questions:IQuestion[],
  questionsLoaded:boolean,
  status:string,
  testType:string,
  testMode:boolean,
  limit:number,
  secLeft:number,
  noOfQuesAttempted:number;

}
