import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    GuestVoteExceededModule
  ],
  imports: [
    IonicPageModule.forChild(GuestVoteExceededModule)
  ],
  exports: [
    GuestVoteExceededModule
  ]
})
export class GuestVoteExceededModule { }
