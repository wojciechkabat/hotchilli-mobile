import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormErrorComponentModule } from "../../components/form-error/form-error.module";
import { TranslateModule } from "@ngx-translate/core";
import { RegistrationPrivacyPolicyStepComponent } from "./steps/registration-privacy-policy-step/registration-privacy-policy-step";
import { PictureSettingCardModule } from "../../components/picture-setting-card/picture-setting-card.module";
import { RegistrationFBPage } from "./registrationFB";
import { RegistrationfbDataStep } from "./steps/registrationfb-data-step/registrationfb-data-step";
import { RegistrationFBPictureStepComponent } from "./steps/registrationfb-picture-step/registrationfb-picture-step";

@NgModule({
  declarations: [
    RegistrationFBPage,
    RegistrationfbDataStep,
    RegistrationFBPictureStepComponent,
    RegistrationPrivacyPolicyStepComponent
  ],
  imports: [
    IonicPageModule.forChild(RegistrationFBPage),
    TranslateModule.forChild(),
    FormErrorComponentModule,
    PictureSettingCardModule
  ],
})
export class RegistrationFBPageModule {}
