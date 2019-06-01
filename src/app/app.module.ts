import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { RoundProgressModule } from "angular-svg-round-progressbar";
import { VoteSliderComponent } from "../components/vote-slider/vote-slider";
import { PersonCardComponent } from "../components/person-card/person-card";
import { VotingPage } from "../pages/voting/voting";
import { SummaryComponent } from "../components/summary/summary";
import { ScoreCircleComponent } from "../components/score-circle/score-circle";
import { PersonFeederProvider } from "../providers/person-feeder";
import { PictureAsyncComponent } from "../components/picture-async/picture-async";
import { PeopleLoadingComponent } from "../components/people-loading/people-loading";

@NgModule({
  declarations: [
    MyApp,
    VotingPage,
    VoteSliderComponent,
    PersonCardComponent,
    SummaryComponent,
    ScoreCircleComponent,
    PictureAsyncComponent,
    PeopleLoadingComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    RoundProgressModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    VotingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PersonFeederProvider
  ]
})
export class AppModule {}
