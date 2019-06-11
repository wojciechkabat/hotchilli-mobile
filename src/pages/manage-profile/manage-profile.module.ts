import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageProfilePage } from './manage-profile';
import { PictureSettingCardModule } from "../../components/picture-setting-card/picture-setting-card.module";

@NgModule({
  declarations: [
    ManageProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ManageProfilePage),
    PictureSettingCardModule
  ],
})
export class ManageProfilePageModule {}
