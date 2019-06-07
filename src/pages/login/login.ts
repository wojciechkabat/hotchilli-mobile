import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginDto } from "../../models/loginDto";
import { LoginService } from "../../providers/loginService";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private loginService: LoginService) {}

  loginWithCredentials(loginDto: LoginDto) {
        this.loginService.loginWithCredentials(loginDto).subscribe(() => {
          this.navCtrl.setRoot('VotingPage')
        })
  }
}
