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
import { GuestVoteExceededComponent } from "../../components/guest-vote-exceeded/guest-vote-exceeded";
import { ScoreCircleModule } from "../../components/score-circle/score-circle.module";
import { PictureAsyncModule } from "../../components/picture-async/picture-async.module";

@NgModule({
  declarations: [
    VotingPage,
    VoteSliderComponent,
    PersonCardComponent,
    SummaryComponent,
    PeopleLoadingComponent,
    GuestVoteExceededComponent
  ],
  imports: [
    IonicPageModule.forChild(VotingPage),
    ScoreCircleModule,
    PictureAsyncModule
  ],
})
export class VotingPageModule {}
