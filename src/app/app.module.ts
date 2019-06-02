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
import { PictureAsyncComponent } from "../components/picture-async/picture-async";
import { PeopleLoadingComponent } from "../components/people-loading/people-loading";
import { PersonFeederApiProvider } from "../providers/person-feeder-api";
import { Api } from "../providers/api";
import { HttpClientModule } from "@angular/common/http";
import { VoteService } from '../providers/vote-service';

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
    RoundProgressModule,
    HttpClientModule
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
    PersonFeederApiProvider,
    Api,
    VoteService
  ]
})
export class AppModule {}
