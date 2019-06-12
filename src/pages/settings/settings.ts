import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, Navbar, NavController, NavParams } from 'ionic-angular';
import { LoginService } from "../../providers/loginService";
import { PopupService } from "../../providers/popupService";
import { UserService } from "../../providers/userService";
import { Person } from "../../models/person";
import { LocalSettings } from "../../models/localSettings";
import { BackButtonService } from "../../providers/backButtonService";

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage implements OnInit{
  @ViewChild(Navbar) navBar: Navbar;

  userData: Person;
  localSettings: LocalSettings;


  ngOnInit(): void {
    this.userData = this.userService.userData;
    this.localSettings = { ...this.userService.localSettings};
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private backButtonService: BackButtonService,
              public userService: UserService,
              private popupService: PopupService,
              private loginService: LoginService) {
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = ()=> {
      this.navCtrl.pop({animate: true, direction: 'forward'})
    };
  }

  updateSettings() {
    this.userService.updateLocalSettings(new LocalSettings(this.localSettings.displayOption))
  }

  logout() {
    this.loginService.logOut().subscribe(() => {
      this.navCtrl.setRoot('VotingPage').then(() => {
      this.popupService.displayToast("Successfully logged out")
      });
    })
  }

  ionViewDidEnter() {
    this.backButtonService.registerCustomBackButtonAction(()=> {
      this.navCtrl.pop({animate: true, direction: 'forward'})
    });
  }

  ionViewWillLeave() {
    this.backButtonService.unregisterCustomBackButtonAction();
  }
}
