import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VoteSliderComponent } from "./vote-slider";
import { ScoreCircleModule } from "../score-circle/score-circle.module";


@NgModule({
  declarations: [
    VoteSliderComponent
  ],
  imports: [
    IonicPageModule.forChild(VoteSliderComponent),
    ScoreCircleModule
  ],
  exports: [
    VoteSliderComponent
  ]
})
export class VoteSliderModule { }
