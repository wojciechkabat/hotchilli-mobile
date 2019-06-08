import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsPage } from './settings';
import { ScoreCircleModule } from "../../components/score-circle/score-circle.module";

@NgModule({
  declarations: [
    SettingsPage
  ],
  imports: [
    IonicPageModule.forChild(SettingsPage),
    ScoreCircleModule
  ],
})
export class SettingsPageModule {}
