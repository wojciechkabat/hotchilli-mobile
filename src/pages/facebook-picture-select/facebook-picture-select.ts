import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FacebookProvider } from "../../providers/facebookProvider";
import { FacebookPhoto } from "../../models/facebookPhoto";
import { Picture } from "../../models/picture";

@IonicPage()
@Component({
  selector: 'page-facebook-picture-select',
  templateUrl: 'facebook-picture-select.html',
})
export class FacebookPictureSelectPage implements OnInit{

  facebookPhotos: FacebookPhoto[];
  isFetchingPhotos: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private facebookProvider: FacebookProvider,
              private viewCtrl: ViewController) {
  }

  ngOnInit(): void {
    this.isFetchingPhotos = true;
    this.facebookProvider.getUserFacebookPictures().then((facebookPhotos) => {
      this.facebookPhotos = facebookPhotos;
      this.isFetchingPhotos = false;
    }, (error) => {
      this.isFetchingPhotos = false;
      console.error(error)
    })
  }

  pictureSelected(photo) {
    this.viewCtrl.dismiss(new Picture(null, photo.source, true))
  }

}
