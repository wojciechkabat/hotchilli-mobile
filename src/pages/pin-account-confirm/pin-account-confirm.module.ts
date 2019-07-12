import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PinAccountConfirmPage } from './pin-account-confirm';
import { FormErrorComponentModule } from "../../components/form-error/form-error.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    PinAccountConfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(PinAccountConfirmPage),
    TranslateModule.forChild(),
    FormErrorComponentModule
  ],
})
export class PinAccountConfirmPageModule {}
