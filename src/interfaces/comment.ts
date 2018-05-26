export interface IComment {
  _id:string,
  postId:string,
  userId:string,
  commenterImage:string,
  commenterName:string,
  content:string,
  likes:number,
  replies:number,
  commentedOn: Date,
  loginModeWhileCommenting:string,
  likedByme:boolean;
}
