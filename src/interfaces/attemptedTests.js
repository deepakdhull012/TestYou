import { IQuestion } from './question';
export interface IAttemptedTest{
  _id:string,
  testId:string,
  userId:string,
  answers:string[],
  status:string;

}
