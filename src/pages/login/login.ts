import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginDto } from "../../models/loginDto";
import { LoginService } from "../../providers/loginService";
import { PopupService } from "../../providers/popupService";
import { LanguageService } from "../../providers/languageService";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  isRequestPending: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private languageService: LanguageService,
              private popupService: PopupService,
              private loginService: LoginService) {
  }

  skipLogin() {
    if (this.navCtrl.canGoBack()) {
      this.navCtrl.pop()
    } else {
      this.navCtrl.setRoot('VotingPage')
    }
  }

  loginWithFacebook() {
    this.isRequestPending = true;
    this.loginService.loginWithFacebook().subscribe(() => {
        this.navCtrl.setRoot('VotingPage').then(() => {
          this.popupService.displayToast(`Logged in with Facebook`)
        })
      },
      (error) => {
        this.isRequestPending = false;
        this.popupService.displayToast(this.languageService.messages['COULD_NOT_LOGIN_TEXT']);
      });
  }

  loginWithCredentials(loginDto: LoginDto) {
    this.isRequestPending = true;
    this.loginService.loginWithCredentials(loginDto).subscribe(() => {
      this.navCtrl.setRoot('VotingPage').then(() => {
        this.popupService.displayToast(`Logged in as: ${loginDto.login}`)
      })
    }, (error) => {
      this.isRequestPending = false;
      if (error == 'CONFIRMATION_PIN_NOT_ENTERED') {
        this.loginService.logOut().subscribe(() => {
          this.popupService.displayToast(this.languageService.messages['YOU_HAVE_TO_ACTIVATE_ACCOUNT_MESSAGE']);
        });
      } else {
        this.popupService.displayToast(this.languageService.messages['COULD_NOT_LOGIN_TEXT']);
      }
    })
  }
}
