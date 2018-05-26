import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { IMessage } from './../interfaces/message';

@Injectable()

export class ChatService {
  socketStatus:boolean = false;
  constructor(private _http: Http){


  }


socket = io.connect('https://agile-inlet-67707.herokuapp.com', {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax : 10000,
    reconnectionAttempts: 99999
});

initSocket(){

        if ( !this.socket ) {
            this.socket = io.connect('https://agile-inlet-67707.herokuapp.com', {
              secure:false,
              reconnection: true,
              reconnectionDelay: 1000,
              reconnectionDelayMax : 10000,
              reconnectionAttempts: 99999
            });
            this.socket.on('connect', function(){console.log('connected')});
            this.socket.on('disconnect', function (){console.log('disconnected')});
        } else {
        //  console.log(this.socket);
            //this.socket.socket.connect(); // Yep, socket.socket ( 2 times )
        }

}




  joinRoom(room,me,other){
    var messageToSent:IMessage=<IMessage>{};
    messageToSent.messageContent = "joined";
    messageToSent.senderId = me._id;
    messageToSent.receiverId = other._id;
    messageToSent.senderName = me.userName;
    messageToSent.receiverName = other.userName;
    messageToSent.messageDate =  new Date();
    messageToSent.type =  "joinStatus";
    messageToSent.roomNo = room.roomCode;
    var dataToPost = {room:room,message:messageToSent}
    this.socket.emit('join',dataToPost);
  }
  emitTyping(room,me,other,typedText){
    var dataToPost = {room:room,message:typedText}
    this.socket.emit('typing',dataToPost);
  }
  sendMessage(messageContent,room,me,other):IMessage{
      var id = '_' + Math.random().toString(36).substr(2, 9);
      var messageToSent:IMessage=<IMessage>{};
      messageToSent.tempId = id;
      messageToSent.messageContent = messageContent;
      messageToSent.senderId = me._id;
      messageToSent.receiverId = other._id;
      messageToSent.senderName = me.userName;
      messageToSent.receiverName = other.userName;
      messageToSent.messageDate =  new Date();
      messageToSent.type =  "chat";
      messageToSent.sent =  false;
      messageToSent.delivered =  false;
      messageToSent.seen =  false;
      messageToSent.roomNo = room.roomCode;
      var dataToPost = {room:room,message:messageToSent}
      this.socket.emit('message',dataToPost);
      return messageToSent;

  }
  leaveRoom(room,me,other){
    var messageToSent:IMessage=<IMessage>{};
    messageToSent.messageContent = "left";
    messageToSent.senderId = me._id;
    messageToSent.receiverId = other._id;
    messageToSent.senderName = me.userName;
    messageToSent.receiverName = other.userName;
    messageToSent.messageDate =  new Date();
    messageToSent.type =  "joinStatus";
    messageToSent.roomNo = room.roomCode;
    var dataToPost = {room:room,message:messageToSent}
    this.socket.emit('leave',dataToPost);
  }
  newUserJoined(){
    let observable = new Observable<any>(observer=>{
      this.socket.on('new user joined',(data)=>{
        observer.next(data);
      });
      return ()=>{this.socket.disconnect();}
    });
    return observable;
  }
  newMessageRecived(){
    let observable = new Observable<any>((observer)=>{
      this.socket.on('message',(data)=>{
        observer.next(data);
      });
      return ()=>{this.socket.disconnect();}
    });
    return observable;
  }
  exit(){
    let observable = new Observable<any>(observer=>{
      this.socket.on('user left',(data)=>{
        observer.next(data);
      });
      return ()=>{this.socket.disconnect();}
    });
    return observable;
  }
  userTyping(){
    let observable = new Observable<any>(observer=>{
      this.socket.on('usertyping',(data)=>{
        observer.next(data);
      });
      return ()=>{this.socket.disconnect();}
    });
    return observable;
  }
  sendAcknowledgement(room,message){
    console.log('ack sent');
    var dataToPost = {room:room,message:message}
    this.socket.emit('received',dataToPost);
  }
  acknowlegeReceived(){
    
    let observable = new Observable<any>((observer)=>{
      this.socket.on('delivered',(data)=>{
        observer.next(data);
      });
      return ()=>{this.socket.disconnect();}
    });
    return observable;
  }




}
