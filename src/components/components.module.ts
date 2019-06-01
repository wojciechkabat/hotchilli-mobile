import { NgModule } from '@angular/core';
import { VoteSliderComponent } from "./vote-slider/vote-slider";
import { PersonCardComponent } from './person-card/person-card';
import { SummaryComponent } from './summary/summary';
import { ScoreCircleComponent } from './score-circle/score-circle';
@NgModule({
	declarations: [VoteSliderComponent,
    PersonCardComponent,
    SummaryComponent,
    ScoreCircleComponent],
	imports: [],
	exports: [VoteSliderComponent,
    PersonCardComponent,
    SummaryComponent,
    ScoreCircleComponent]
})
export class ComponentsModule {}
