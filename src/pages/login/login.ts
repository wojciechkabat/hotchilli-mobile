import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginDto } from "../../models/loginDto";
import { LoginService } from "../../providers/loginService";
import { PopupService } from "../../providers/popupService";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  isRequestPending: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private popupService: PopupService,
              private loginService: LoginService) {
  }

  loginWithCredentials(loginDto: LoginDto) {
    this.isRequestPending = true;
    this.loginService.loginWithCredentials(loginDto).subscribe(() => {
      this.navCtrl.setRoot('VotingPage').then(() => {
        this.popupService.displayToast(`Logged in as: ${loginDto.login}`)
      })
    }, () => {
      this.isRequestPending = false;
    })
  }
}
