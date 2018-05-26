import { NgModule } from '@angular/core';
import { QuestionFilterPipe } from './question-filter/question-filter';
import { SmartDatePipe } from './smart-date-pipe';
import { RelativeDatePipe } from './relative-date-pipe';

@NgModule({
	declarations: [QuestionFilterPipe,SmartDatePipe,RelativeDatePipe],
	imports: [],
	exports: [QuestionFilterPipe,SmartDatePipe,RelativeDatePipe]
})
export class PipesModule {}
