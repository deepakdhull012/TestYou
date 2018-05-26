import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Content, Platform } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { TextToSpeech } from '@ionic-native/text-to-speech';

import {Observable} from 'rxjs/Observable'
import { timer } from 'rxjs/observable/timer';
import { take,map } from 'rxjs/operators';

import { ChatService } from './../../services/chat.service';
import { PostService } from './../../services/post.service';
import { UtilService } from './../../services/util.service';
import { GetService } from './../../services/get.service';

import { IChatRoom } from '../../interfaces/chatRoom';
import { IMessage } from '../../interfaces/message';
import { IUser } from '../../interfaces/user';


@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
  providers: [ChatService,PostService,UtilService,GetService],
})
export class ChatPage {
  other:IUser;
  me:IUser;
  loggedInUserId:string;
  room:IChatRoom;
  messages:IMessage[] =[];
  @ViewChild(Content) content: Content;
  online:boolean = false;
  msgText:string = '';
  typingText:string;
  isTyping:boolean;
  currentTime:Date = new Date();;
  timerSub:any;
  hasSpeechPermission:boolean = false;
  isRecognitionAvailable:boolean = false;
  isDevice:boolean = false;
  isConnected:boolean = false;
  audioModeOn:boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,private _chatService: ChatService,
    private _postService: PostService,private util:UtilService,private _getService: GetService,
    private speechRecognition: SpeechRecognition,public platform: Platform,private tts: TextToSpeech) {

      this.isConnected = navigator.onLine;
      console.log(this.isConnected);
      Observable.fromEvent(window, 'online').map(() => {}).subscribe(()=>{
          this.isConnected = true;
          if(this.room && this.me && this.other){
            this._chatService.initSocket();
          }
      });
      Observable.fromEvent(window, 'offline').map(() => {}).subscribe(()=>{
          this.isConnected = false;
          if(this.room && this.me && this.other){
        //    this._chatService.initSocket();
          }
      });


      if (this.platform.is('cordova')) {
        this.isDevice = true;
      this.speechRecognition.hasPermission().then((hasPermission: boolean) =>{
        if(!hasPermission){
          this.speechRecognition.requestPermission().then(() =>{
            //GRANTED
            this.hasSpeechPermission = true;
          },
        ()=>{
          //REJECTED
          this.hasSpeechPermission = true;
        });
        }
        else{
          this.hasSpeechPermission = true;
        }
      });
      this.speechRecognition.isRecognitionAvailable().then((available: boolean) =>{
        if(available){
          this.isRecognitionAvailable = true;
        }
        else{
          this.isRecognitionAvailable = false;
          alert('Speech Recognition not supported here');
        }
      });
    }
    else{
      console.log("Running in browser");
    }
    if(navParams.data){
      this.other = navParams.data;
    }

    this._chatService.newUserJoined().subscribe(data =>{
      if(data.message.senderId == this.loggedInUserId){
        data.message.isMine = true;

      }
      else{
        data.message.isMine = false;
      }
      this.online = true;
      //this.messages.push(data.message);
    });
    this._chatService.newMessageRecived().subscribe(data =>{
      console.log("received",data);
      if(data.message.senderId == this.loggedInUserId){
        data.message.isMine = true;
        this.msgExists(data.message);
      }
      else{
        data.message.isMine = false;
        this.online = true;
        this.typingText = '';
        this.isTyping = false;
        this.messages.push(data.message);
        this._chatService.sendAcknowledgement(this.room,data.message);
        if(this.isDevice && this.audioModeOn){
          this.tts.speak(data.message.messageContent)
            .then(() => console.log('Success'))
            .catch((reason: any) => console.log(reason));
        }

      }



      this.scrollToBottom(300);
    });
    this._chatService.exit().subscribe(data =>{
      //this.messages.push(data.message
      this.online = false;
    });
    this._chatService.acknowlegeReceived().subscribe(data =>{
      console.log('ack received');
      this.markReceived(data.id);
      //this.messages.push(data.message

    });
    this._chatService.userTyping().subscribe(data =>{
      this.isTyping = true;
      this.online = true;
      this.typingText = data.message;
      this.scrollToBottom(0);
      var start = 2;
      if(this.timerSub){
        this.timerSub.unsubscribe();
      }
      this.timerSub = Observable.timer(0,1000)
        .map(i => start - i)
        .take(start + 1)
        .subscribe(i =>{
          if(i==0){
            this.isTyping = false;
          }
        });
    /*  setTimeout(() => {
          time
          this.typingText = '';
          this.isTyping = false;
        }, 5000)*/
    });


      this.loggedInUserId = localStorage.getItem('userId');
      var loading = this.util.displayLoading("Please wait loading profile..");
      this.getUserInfoById().then((loaded)=>{
        this.createChatRoom().then((loaded)=>{
          loading.dismiss();
          this.scrollToBottom(1000);
        });
      });

  }

  ionViewDidLoad() {
    if(this.room && this.me && this.other){
      this.join();
    }
  }
  ionViewDidEnter(){
    this.scrollToBottom(1000);//300ms animation speed
  }

  join(){
    this._chatService.joinRoom(this.room,this.me,this.other);
  }
  ionViewWillLeave(){
    this._chatService.leaveRoom(this.room,this.me,this.other);
  }
  ionViewWillEnter(){
    if(this.room && this.me && this.other){
      this.join();
    }
  }

  getUserInfoById(){
    return new Promise((resolve) => {
    var data = this._getService.getUserInfoById(this.loggedInUserId);
    data.subscribe((res:IUser) => {
      this.me = res;
      console.log("me",this.me);
      resolve(true);
    });
  });
  }
  getMessagesOfCurrentRoom(){
    return new Promise((resolve) => {
    var data = this._getService.getMessagesByRoom(this.room.roomCode);
    data.subscribe((res:IMessage[]) => {
      this.messages = res;
      for(let msg of this.messages){
        if(msg.senderId == this.loggedInUserId){
          msg.isMine = true;
        }
        else{
          msg.isMine = false;
        }
      }
      this.join();
      resolve(true);
    });
  });
  }
  createChatRoom(){
    return new Promise((resolve) => {
      var roomCode = this.me._id+this.other._id+"";
    var dataToPost = JSON.stringify({chatter1:this.me._id,chatter2:this.other._id,roomCode:roomCode});
    var data = this._postService.createChatRoom(dataToPost);
    data.subscribe((res:IChatRoom) => {
      this.room = res;
      this.getMessagesOfCurrentRoom().then((loaded)=>{
        resolve(true);
      });

    });
  });
  }
  sendMessage(messageContent){
    if(messageContent!=''){
      var response = this._chatService.sendMessage(messageContent,this.room,this.me,this.other);
      console.log(response);
      response.isMine = true;
      this.messages.push(response);
      this.scrollToBottom(300);
      this.msgText = "";
    }
  }
  iniateVoiceProcess(){
    if(this.isRecognitionAvailable){
      if(this.hasSpeechPermission){
        this.speechRecognition.startListening().subscribe(
        (matches: Array<string>) => {
          this.msgText = matches[0];
        },
        (onerror) => {alert('error:'+ onerror);});
      }
      else{
        this.speechRecognition.requestPermission().then(() =>{
          //GRANTED
          this.hasSpeechPermission = true;
        },
      ()=>{
        //REJECTED
        this.hasSpeechPermission = true;
      });
      }
    }
    else{
      alert("Sorry voice feature is not supported for your device..")
    }
  }
  scrollToBottom(duration) {
        setTimeout(() => {
            this.content.scrollToBottom(duration);
        });
    }
    onChange(e){
      this._chatService.emitTyping(this.room,this.me,this.other,this.msgText);
    }
    msgExists(message) {
    return this.messages.some((msg)=> {
       if(msg.tempId === message.tempId){
        msg.sent = true;
        msg._id = message._id;

        return true;
      };
    });
  }
  markReceived(id) {
 return this.messages.some((msg)=> {
     if(msg._id === id){
      msg.delivered = true;
      return true;
    };
  });
}


}
