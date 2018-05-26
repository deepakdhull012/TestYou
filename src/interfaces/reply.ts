export interface IReply {
  _id:string,
  commentId:string,
  userId:string,
  replierImage:string,
  replierName:string,
  content:string,
  likes:number,
  repliedOn: Date,
  loginModeWhileReplying:string,
  likedByme:boolean;
}
