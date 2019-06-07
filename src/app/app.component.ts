import { Component, ViewChild } from '@angular/core';
import { Events, NavController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { VotingPage } from "../pages/voting/voting";
import { LoginService } from "../providers/loginService";
import { LoginDto } from "../models/loginDto";
import { PopupService } from "../providers/popupService";
import { MobileAccessibility } from "@ionic-native/mobile-accessibility";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') navCtrl: NavController;

  constructor(platform: Platform, statusBar: StatusBar,
              splashScreen: SplashScreen,
              private events: Events,
              private popupService: PopupService,
              private mobileAccessibility: MobileAccessibility,
              private loginService: LoginService) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      this.mobileAccessibility.usePreferredTextZoom(false);
      // this.loginService.loginWithCredentials(new LoginDto()).subscribe(() => {
        this.navCtrl.setRoot('VotingPage');
      // });
      splashScreen.hide();
    });

    this.events.subscribe("LOGOUT_EVENT",
      () => {
        // this.navCtrl.setRoot("WelcomePage");
        this.popupService.getInformationAlertPopup(
          'AUTHENTICATION_ERROR_TITLE',
          'AUTHENTICATION_ERROR_MESSAGE',
          "OK"
        ).present();
        this.loginService.clearTokens();
      });
  }
}

