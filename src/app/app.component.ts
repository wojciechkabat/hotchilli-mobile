import { Component, ViewChild } from '@angular/core';
import { Events, NavController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { VotingPage } from "../pages/voting/voting";
import { LoginService } from "../providers/loginService";
import { PopupService } from "../providers/popupService";
import { MobileAccessibility } from "@ionic-native/mobile-accessibility";
import { TokensResponseDto } from "../models/tokensResponseDto";
import { Storage } from '@ionic/storage';
import { LoginDto } from "../models/loginDto";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') navCtrl: NavController;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private storage: Storage,
              private events: Events,
              private popupService: PopupService,
              private mobileAccessibility: MobileAccessibility,
              private loginService: LoginService) {
    this.loginIfTokenAvailable();


    platform.ready().then(() => {
      statusBar.styleDefault();
      this.mobileAccessibility.usePreferredTextZoom(false);
      // this.loginService.loginWithCredentials(new LoginDto('123@pl.pl', '123456Kk'))
      //   .subscribe(() => {
          this.navCtrl.setRoot('VotingPage');
        // })
      splashScreen.hide();
    });

    // this.events.subscribe("LOGOUT_EVENT",
    //   () => {
    //     // this.navCtrl.setRoot("WelcomePage");
    //     this.popupService.getInformationAlertPopup(
    //       'AUTHENTICATION_ERROR_TITLE',
    //       'AUTHENTICATION_ERROR_MESSAGE',
    //       "OK"
    //     ).present();
    //     this.loginService.clearTokens();
    //   });
  }

  private loginIfTokenAvailable() {
    this.storage.get('applicationTokens').then((tokens: TokensResponseDto) => {
      if (tokens) {
        this.loginService.initializeTokens(tokens.accessToken, tokens.refreshTokenId);
        this.navCtrl.setRoot('VotingPage');
      }
    });
  }
}

