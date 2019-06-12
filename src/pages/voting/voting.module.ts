import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VotingPage } from './voting';
import { ScoreCircleModule } from "../../components/score-circle/score-circle.module";
import { PictureAsyncModule } from "../../components/picture-async/picture-async.module";
import { VoteSliderModule } from "../../components/vote-slider/vote-slider.module";
import { PersonCardModule } from "../../components/person-card/person-card.module";
import { SummaryModule } from "../../components/summary/summary.module";
import { PeopleLoadingModule } from "../../components/people-loading/people-loading.module";
import { GuestVoteExceededModule } from "../../components/guest-vote-exceeded/guest-vote-exceeded.module";

@NgModule({
  declarations: [
    VotingPage
  ],
  imports: [
    IonicPageModule.forChild(VotingPage),
    ScoreCircleModule,
    PictureAsyncModule,
    VoteSliderModule,
    PersonCardModule,
    SummaryModule,
    PeopleLoadingModule,
    GuestVoteExceededModule
  ],
})
export class VotingPageModule {}
