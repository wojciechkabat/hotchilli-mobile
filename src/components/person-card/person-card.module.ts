import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonCardComponent } from "./person-card";


@NgModule({
  declarations: [
    PersonCardComponent
  ],
  imports: [
    IonicPageModule.forChild(PersonCardComponent)
  ],
  exports: [
    PersonCardComponent
  ]
})
export class PersonCardModule { }
