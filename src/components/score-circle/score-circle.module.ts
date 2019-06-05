import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScoreCircleComponent } from "./score-circle";


@NgModule({
  declarations: [
    ScoreCircleComponent
  ],
  imports: [
    IonicPageModule.forChild(ScoreCircleComponent)
  ],
  exports: [
    ScoreCircleComponent
  ]
})
export class ScoreCircleModule { }
