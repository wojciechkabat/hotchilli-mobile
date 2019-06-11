import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PictureSettingCardComponent } from "./picture-setting-card";
import { PictureAsyncModule } from "../picture-async/picture-async.module";


@NgModule({
  declarations: [
    PictureSettingCardComponent
  ],
  imports: [
    IonicPageModule.forChild(PictureSettingCardComponent),
    PictureAsyncModule
  ],
  exports: [
    PictureSettingCardComponent
  ]
})
export class PictureSettingCardModule { }
