import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the QuestionFilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'questionFilterPipe',
})
export class QuestionFilterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(questions: any[], year: Number[], id: string):any[] {
    if (typeof questions === 'object') {
            var filteredQuestions = [];
            if (year.length === 0) {
                filteredQuestions = questions;
            }
            else {
                for (let question of questions) {
                    if (question.year != null && question.year.match(new RegExp(''+year, 'i'))) {
                        filteredQuestions.push(question);
                    }
                }
            }

            return filteredQuestions;
        }
        else {
            return null;
        }
  }
}
