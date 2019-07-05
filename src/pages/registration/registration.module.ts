import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistrationPage } from './registration';
import { FormErrorComponentModule } from "../../components/form-error/form-error.module";
import { TranslateModule } from "@ngx-translate/core";
import { RegistrationNamesStepComponent } from "./steps/registration-names-step/registration-names-step";
import { RegistrationCredentialsStepComponent } from "./steps/registration-credentials-step/registration-credentials-step";
import { RegistrationPictureStepComponent } from "./steps/registration-picture-step/registration-picture-step";
import { RegistrationPrivacyPolicyStepComponent } from "./steps/registration-privacy-policy-step/registration-privacy-policy-step";
import { RegistrationBirthdayGenderStep } from "./steps/registration-birthday-gender-step/registration-birthday-gender-step";
import { PictureSettingCardModule } from "../../components/picture-setting-card/picture-setting-card.module";

@NgModule({
  declarations: [
    RegistrationPage,
    RegistrationNamesStepComponent,
    RegistrationBirthdayGenderStep,
    RegistrationCredentialsStepComponent,
    RegistrationPictureStepComponent,
    RegistrationPrivacyPolicyStepComponent
  ],
  imports: [
    IonicPageModule.forChild(RegistrationPage),
    TranslateModule.forChild(),
    FormErrorComponentModule,
    PictureSettingCardModule
  ],
})
export class RegistrationPageModule {}
