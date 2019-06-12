import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonCardComponent } from "./person-card";
import { PictureAsyncModule } from "../picture-async/picture-async.module";


@NgModule({
  declarations: [
    PersonCardComponent
  ],
  imports: [
    IonicPageModule.forChild(PersonCardComponent),
    PictureAsyncModule
  ],
  exports: [
    PersonCardComponent
  ]
})
export class PersonCardModule { }
