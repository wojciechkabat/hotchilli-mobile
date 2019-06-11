import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from "../../providers/userService";
import { Picture } from "../../models/picture";

@IonicPage()
@Component({
  selector: 'page-manage-profile',
  templateUrl: 'manage-profile.html',
})
export class ManageProfilePage implements OnInit {

  pictures: Picture[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService) {
  }

  ngOnInit(): void {
    this.pictures = this.userService.userData.pictures;
  }

}
