export interface IPost {
  _id:string,
  examId:string,
  createdBy:string,
  postImage:string,
  posterImage:string,
  posterName:string,
  postContent:string,
  hasApproved:boolean,
  likes:number,
  comments:number,
  shares:number,
  postedOn: Date,
  displayTime:string,
  loginModeWhilePosting:string,
  likedByme:boolean;
}
