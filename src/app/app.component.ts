import { Component, ViewChild } from '@angular/core';
import { Events, NavController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { VotingPage } from "../pages/voting/voting";
import { LoginService } from "../providers/loginService";
import { LoginDto } from "../models/loginDto";
import { PopupService } from "../providers/popupService";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') navCtrl: NavController;

  constructor(platform: Platform, statusBar: StatusBar,
              splashScreen: SplashScreen,
              private events: Events,
              private popupService: PopupService,
              private loginService: LoginService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      this.loginService.loginWithCredentials(new LoginDto()).subscribe(() => {
        this.navCtrl.setRoot('VotingPage');
      });
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

