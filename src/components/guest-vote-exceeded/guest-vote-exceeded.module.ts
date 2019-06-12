import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuestVoteExceededComponent } from "./guest-vote-exceeded";

@NgModule({
  declarations: [
    GuestVoteExceededComponent
  ],
  imports: [
    IonicPageModule.forChild(GuestVoteExceededComponent)
  ],
  exports: [
    GuestVoteExceededComponent
  ]
})
export class GuestVoteExceededModule { }
