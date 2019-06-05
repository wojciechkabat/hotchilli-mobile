import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SummaryComponent } from "./summary";


@NgModule({
  declarations: [
    SummaryComponent
  ],
  imports: [
    IonicPageModule.forChild(SummaryComponent)
  ],
  exports: [
    SummaryComponent
  ]
})
export class SummaryModule { }
