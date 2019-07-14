import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { MyApp } from './app.component';
import { PersonFeederApiProvider } from "../providers/person-feeder-api";
import { Api } from "../providers/api";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { VoteService } from '../providers/vote-service';
import { InterceptorModule } from '../providers/my-request-interceptor';
import { LoginService } from "../providers/loginService";
import { IonicStorageModule } from "@ionic/storage";
import { PopupService } from "../providers/popupService";
import { UserService } from "../providers/userService";
import { Device } from "@ionic-native/device";
import { MobileAccessibility } from "@ionic-native/mobile-accessibility";
import { PictureService } from "../providers/pictureService";
import {File} from "@ionic-native/file";
import { FileTransfer } from '@ionic-native/file-transfer';
import {PhotoViewer} from "@ionic-native/photo-viewer";
import { BackButtonService } from "../providers/backButtonService";
import { DatePicker } from "@ionic-native/date-picker";
import { InputLengthValidatorProvider } from "../providers/inputLengthValidator";
import { registerLocaleData } from "@angular/common";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import localePl from '@angular/common/locales/pl';
import { Globalization } from "@ionic-native/globalization";
import { LanguageService } from "../providers/languageService";
import { PrivacyPolicyService } from "../providers/privacyPolicy";
import * as ionicGalleryModal from 'ionic-gallery-modal';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { FacebookProvider } from '../providers/facebookProvider';
import { Facebook } from "@ionic-native/facebook";

//register locale Date for all translated versions of HotChilli
registerLocaleData(localePl);

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      scrollAssist: false,
      pageTransition: 'ios-transition'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
    InterceptorModule,
    IonicStorageModule.forRoot(),
    ionicGalleryModal.GalleryModalModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: ionicGalleryModal.GalleryModalHammerConfig,
    },
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PersonFeederApiProvider,
    Api,
    Camera,
    PhotoViewer,
    VoteService,
    PopupService,
    UserService,
    LoginService,
    PictureService,
    FileTransfer,
    File,
    Device,
    BackButtonService,
    MobileAccessibility,
    Globalization,
    DatePicker,
    Facebook,
    FacebookProvider,
    InputLengthValidatorProvider,
    LanguageService,
    PrivacyPolicyService
  ]
})
export class AppModule {}
