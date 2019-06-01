import { NgModule } from '@angular/core';
import { VoteSliderComponent } from "./vote-slider/vote-slider";
import { PersonCardComponent } from './person-card/person-card';
import { SummaryComponent } from './summary/summary';
import { ScoreCircleComponent } from './score-circle/score-circle';
import { PictureAsyncComponent } from './picture-async/picture-async';
import { PeopleLoadingComponent } from './people-loading/people-loading';
@NgModule({
	declarations: [VoteSliderComponent,
    PersonCardComponent,
    SummaryComponent,
    ScoreCircleComponent,
    PictureAsyncComponent,
    PeopleLoadingComponent],
	imports: [],
	exports: [VoteSliderComponent,
    PersonCardComponent,
    SummaryComponent,
    ScoreCircleComponent,
    PictureAsyncComponent,
    PeopleLoadingComponent]
})
export class ComponentsModule {}
