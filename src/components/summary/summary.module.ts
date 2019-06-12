import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SummaryComponent } from "./summary";
import { ScoreCircleModule } from "../score-circle/score-circle.module";


@NgModule({
  declarations: [
    SummaryComponent
  ],
  imports: [
    IonicPageModule.forChild(SummaryComponent),
    ScoreCircleModule
  ],
  exports: [
    SummaryComponent
  ]
})
export class SummaryModule { }
