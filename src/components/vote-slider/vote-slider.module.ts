import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VoteSliderComponent } from "./vote-slider";


@NgModule({
  declarations: [
    VoteSliderComponent
  ],
  imports: [
    IonicPageModule.forChild(VoteSliderComponent)
  ],
  exports: [
    VoteSliderComponent
  ]
})
export class VoteSliderModule { }
