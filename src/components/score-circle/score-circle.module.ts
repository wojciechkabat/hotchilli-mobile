import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScoreCircleComponent } from "./score-circle";
import { RoundProgressModule } from "angular-svg-round-progressbar";


@NgModule({
  declarations: [
    ScoreCircleComponent
  ],
  imports: [
    IonicPageModule.forChild(ScoreCircleComponent),
    RoundProgressModule
  ],
  exports: [
    ScoreCircleComponent
  ]
})
export class ScoreCircleModule { }
