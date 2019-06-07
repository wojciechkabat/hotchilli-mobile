import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { PersonFeederApiProvider } from "../providers/person-feeder-api";
import { Api } from "../providers/api";
import { HttpClientModule } from "@angular/common/http";
import { VoteService } from '../providers/vote-service';
import { InterceptorModule } from '../providers/my-request-interceptor';
import { LoginService } from "../providers/loginService";
import { IonicStorageModule } from "@ionic/storage";
import { PopupService } from "../providers/popupService";
import { UserService } from "../providers/userService";
import { Device } from "@ionic-native/device";
import { MobileAccessibility } from "@ionic-native/mobile-accessibility";

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    InterceptorModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PersonFeederApiProvider,
    Api,
    VoteService,
    PopupService,
    UserService,
    LoginService,
    Device,
    MobileAccessibility
  ]
})
export class AppModule {}
