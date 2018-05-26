import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



/* Modules added by me */
import { HttpModule } from '@angular/http';
import { NgPipesModule } from 'ngx-pipes';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { Push } from '@ionic-native/push';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { TextToSpeech } from '@ionic-native/text-to-speech';
/* Modules added by me */

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

/* Pages Created By Me */
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { TopicsPage } from '../pages/topics/topics';
import { TestPage } from '../pages/test/test';
import { ReportCardPage } from '../pages/report-card/report-card';
import { TestCustomizerPage } from '../pages/test-customizer/test-customizer';
import { QuestionsPage } from '../pages/questions/questions';
import { ChaptersPage } from '../pages/chapters/chapters';
import { SinglePageTestPage } from '../pages/single-page-test/single-page-test';
import { ReviewPage } from '../pages/review/review';
import { TopicWiseFilterPage } from '../pages/topic-wise-filter/topic-wise-filter';
import { NewsFeedPage } from '../pages/news-feed/news-feed';
import { TabPage } from '../pages/tab/tab';
import { CreatePostPage } from '../pages/create-post/create-post';
import { CommentPage } from '../pages/comment/comment';
import { RepliesPage } from '../pages/replies/replies';
import { TestListPage } from '../pages/test-list/test-list';
import { MePage } from '../pages/me/me';
import { SubjectPage } from '../pages/subject/subject';
import { VideoPlayerPage } from '../pages/video-player/video-player';
import { SubmitTestDialogPage } from '../pages/submit-test-dialog/submit-test-dialog';
import { ProfilePage } from '../pages/profile/profile';
import { ChatPage } from '../pages/chat/chat';





import {PipesModule} from './../pipes/pipes.module';


/* Pages Created By Me */

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';



@NgModule({
  declarations: [MyApp,HomePage,SignupPage,LoginPage,TopicsPage,TestPage,ReportCardPage,
    TestCustomizerPage,QuestionsPage,ChaptersPage,SinglePageTestPage,ReviewPage,
    TopicWiseFilterPage,NewsFeedPage,TabPage,CreatePostPage,CommentPage,RepliesPage,
    TestListPage,MePage,SubjectPage,VideoPlayerPage,SubmitTestDialogPage,ProfilePage,ChatPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    BrowserAnimationsModule,
    NgPipesModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp,HomePage,SignupPage,LoginPage,TopicsPage,TestPage,ReportCardPage,
    TestCustomizerPage,QuestionsPage,ChaptersPage,SinglePageTestPage,ReviewPage,
    TopicWiseFilterPage,NewsFeedPage,TabPage,CreatePostPage,CommentPage,RepliesPage,
    TestListPage,MePage,SubjectPage,VideoPlayerPage,SubmitTestDialogPage,ProfilePage,ChatPage],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Facebook,
    GooglePlus,
    Push,
    SpeechRecognition,
    TextToSpeech
  ]
})
export class AppModule {}
