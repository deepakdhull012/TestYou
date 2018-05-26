export interface IMessage {
  _id:string,
  tempId:string,
  roomNo:string,
  senderId:string,
  receiverId:string,
  senderName:string,
  receiverName:string,
  messageContent:string,
  messageDate:Date,
  isMine:boolean,
  type:String,
  sent:boolean,
  delivered:boolean,
  seen:boolean;
  // chat or joinStatus
}
