import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VotingPage } from './voting';
import { PeopleLoadingComponent } from "../../components/people-loading/people-loading";
import { PersonCardComponent } from "../../components/person-card/person-card";
import { ScoreCircleComponent } from "../../components/score-circle/score-circle";
import { VoteSliderComponent } from "../../components/vote-slider/vote-slider";
import { SummaryComponent } from "../../components/summary/summary";
import { PictureAsyncComponent } from "../../components/picture-async/picture-async";
import { RoundProgressModule } from "angular-svg-round-progressbar";

@NgModule({
  declarations: [
    VotingPage,
    VoteSliderComponent,
    PersonCardComponent,
    SummaryComponent,
    ScoreCircleComponent,
    PictureAsyncComponent,
    PeopleLoadingComponent
  ],
  imports: [
    IonicPageModule.forChild(VotingPage),
    RoundProgressModule
  ],
})
export class VotingPageModule {}
