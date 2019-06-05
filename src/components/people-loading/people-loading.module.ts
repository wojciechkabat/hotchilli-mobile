import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PeopleLoadingComponent } from "./people-loading";


@NgModule({
  declarations: [
    PeopleLoadingComponent
  ],
  imports: [
    IonicPageModule.forChild(PeopleLoadingComponent)
  ],
  exports: [
    PeopleLoadingComponent
  ]
})
export class PeopleLoadingModule { }
