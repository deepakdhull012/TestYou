  import { Component } from '@angular/core';
  import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

  import { SinglePageTestPage } from './../../pages/single-page-test/single-page-test';
  import { IChapter } from './../../interfaces/chapter';
  import { ITopic } from './../../interfaces/topic';
  import { IQuestion } from './../../interfaces/question';

  @Component({
    selector: 'page-topic-wise-filter',
    templateUrl: 'topic-wise-filter.html',
  })
  export class TopicWiseFilterPage {
    chapters:IChapter[] = [];
    topics:ITopic[] = [];
    selectedTopics:ITopic[] = [];
    tempraryTopicsChunk:ITopic[] = [];
    allQuestions:IQuestion[] = [];
    filteredQuestions:IQuestion[] = [];
    filteredQuestionList:IQuestion[] = [];
    filteredQuestionsTopicWise:IQuestion[] = [];
    year:any = [];

    constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
      if(navParams.data){
        console.log(navParams.data);
        this.chapters = navParams.data.chapters;
        this.topics = navParams.data.topics;
        this.allQuestions = navParams.data.questions;
      }
    }

    ionViewDidLoad() {

    }
    chapterCbChanged(chapter){
      this.tempraryTopicsChunk = [];
      if(chapter.isChecked){
        // Add Topics to filtered list
      this.tempraryTopicsChunk = this.topics.filter(
              topic => topic.chapterId === chapter._id);
      this.selectedTopics = this.selectedTopics.concat(this.tempraryTopicsChunk);
      this.selectedTopics = Array.from(new Set(this.selectedTopics));
      for(let topic of this.tempraryTopicsChunk){
        topic.isChecked = true;
      }
            }
            else{
              // Remove Topics from filtered list
              this.selectedTopics = this.selectedTopics.filter(
                      topic => topic.chapterId != chapter._id);
              this.tempraryTopicsChunk = this.topics.filter(
                      topic => topic.chapterId === chapter._id);
              for(let topic of this.tempraryTopicsChunk){
                topic.isChecked = false;
              }

            }
            this.tempraryTopicsChunk = [];
    }

    topicCbChanged(topic,chapter){
      var topicIndexInSelectedTopics = this.selectedTopics.indexOf(topic);
      console.log("index: "+topicIndexInSelectedTopics);
      if(topic.isChecked){
        if(topicIndexInSelectedTopics == -1){
          this.selectedTopics.push(topic);
        }
        var noOfTopicFromChapterInSelectedList = 0;
        var noOfTopicInChapter = 0;
        for(let topic of this.selectedTopics){
          if(topic.chapterId == chapter._id){
            noOfTopicFromChapterInSelectedList++;
          }
        }
        for(let topic of this.topics){
          if(topic.chapterId == chapter._id){
            noOfTopicInChapter++;
          }
        }
        if((noOfTopicInChapter == noOfTopicFromChapterInSelectedList) && (noOfTopicFromChapterInSelectedList > 0)){
          chapter.isChecked = true;
        }
      }
      else{
        chapter.isChecked = false;
        if(topicIndexInSelectedTopics !== -1){
          this.selectedTopics.splice(topicIndexInSelectedTopics,1);
        }
      }
    }

      applyFilter(){
        this.filteredQuestionsTopicWise = [];
        this.filteredQuestionList = [];
        if(this.selectedTopics.length == 0){
          this.filteredQuestionsTopicWise = this.allQuestions;
        }
        else{
          for (let topic of this.selectedTopics) {
            for(let question of this.allQuestions){
              if(question.topicId == topic._id){
                this.filteredQuestionsTopicWise.push(question);
              }
            }
          }
      }
        if(this.year.length == 0){
          this.filteredQuestionList = this.filteredQuestionsTopicWise;
        }
        else{
          for (let oneYear of this.year) {
            for(let question of this.filteredQuestionsTopicWise){
              if(oneYear>=2011 && question.year == oneYear){
                this.filteredQuestionList.push(question);
              }
              if(oneYear<2011 && question.year >= oneYear && question.year < 2011){
                this.filteredQuestionList.push(question);
              }
            }
        }
    }
    // Go To Single Page Test screen
      if(this.filteredQuestionList.length>0){
        this.navCtrl.push(SinglePageTestPage,this.filteredQuestionList);
      }
      else{
        alert('No questions in the list..try narrowing the filter');
      }
      this.viewCtrl.dismiss();
  }

  clearFilter(){
    this.filteredQuestionList = this.allQuestions;
    this.selectedTopics = [];
    for(let topic of this.topics){
      topic.isChecked = false;
    }
    for(let chapter of this.chapters){
      chapter.isChecked = false;
    }
    this.year = [];
  }
  toggleTopic(chapter){
    chapter.isTopicVisible = !chapter.isTopicVisible;
  }
  dismissFilter(){
      this.viewCtrl.dismiss();
  }

  }
