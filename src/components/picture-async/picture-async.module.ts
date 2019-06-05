import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PictureAsyncComponent } from "./picture-async";


@NgModule({
  declarations: [
    PictureAsyncComponent
  ],
  imports: [
    IonicPageModule.forChild(PictureAsyncComponent)
  ],
  exports: [
    PictureAsyncComponent
  ]
})
export class PictureAsyncModule { }
