import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FacebookPictureSelectPage } from './facebook-picture-select';
import { TranslateModule } from "@ngx-translate/core";
import { PictureAsyncModule } from "../../components/picture-async/picture-async.module";

@NgModule({
  declarations: [
    FacebookPictureSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(FacebookPictureSelectPage),
    TranslateModule.forChild(),
    PictureAsyncModule
  ],
})
export class FacebookPictureSelectPageModule {}
