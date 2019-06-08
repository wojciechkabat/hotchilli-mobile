import { Component, ViewChild } from '@angular/core';
import { IonicPage, Navbar, NavController, NavParams } from 'ionic-angular';
import { LoginService } from "../../providers/loginService";
import { PopupService } from "../../providers/popupService";
import { UserService } from "../../providers/userService";
import { Person } from "../../models/person";

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  @ViewChild(Navbar) navBar: Navbar;

  userData: Person;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userService: UserService,
              private popupService: PopupService,
              private loginService: LoginService) {
    this.userData = this.userService.userData;
    console.log(this.userData)
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e:UIEvent)=>{
      this.navCtrl.pop({animate: true, direction: 'forward'})
    };
  }

  logout() {
    this.loginService.logOut().subscribe(() => {
      this.navCtrl.setRoot('VotingPage').then(() => {
      this.popupService.displayToast("Successfully logged out")
      });
    })
  }
}
