import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { FormErrorComponent } from "../form-error/form-error";

@NgModule({
  declarations: [
    FormErrorComponent,
  ],
  imports: [
    IonicPageModule.forChild(FormErrorComponent)
  ],
  exports: [
    FormErrorComponent
  ]
})
export class FormErrorComponentModule { }
