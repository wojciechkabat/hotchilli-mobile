import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from "../../providers/userService";
import { Picture } from "../../models/picture";
import { PopupService } from "../../providers/popupService";
import { PictureService } from "../../providers/pictureService";

@IonicPage()
@Component({
  selector: 'page-manage-profile',
  templateUrl: 'manage-profile.html',
})
export class ManageProfilePage implements OnInit {

  pictures: Picture[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private pictureService: PictureService,
              private popupService: PopupService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.pictures = this.userService.userData.pictures;
  }

  addPicture() {
    let options = [
      {
        text: 'TAKE_NEW_PICTURE_MESSAGE',
        icon: 'camera',
        handler: () => this.takePicture()
      },
      {
        text: 'CHOOSE_EXISTING_PICTURE_MESSAGE',
        icon: 'image',
        handler: () => this.getPictureFromFile()
      }
    ];
    let actionSheet = this.popupService.getActionSheet('CHOOSE_PICTURE_SOURCE_MESSAGE', options);
    actionSheet.present();
  }

  showFullScreen(pictureUrl: string) {
    this.pictureService.showPictureFullScreen(pictureUrl);
  }

  takePicture() {
    this.pictureService.takePhoto().then(picture => {
      this.uploadPicture(picture).then((picture) => {
        this.pictures.push(picture)
      })
    })
      .catch(() => {
        console.log('error taking picture');
      });
  }

  getPictureFromFile() {
    this.pictureService.getImageFromFile().then(picture => {
      this.uploadPicture(picture).then((picture) => {
        this.pictures.push(picture)
      })
    })
      .catch(() => {
        console.log('error getting picture from file');
      });
  }

  private uploadPicture(picture: string): Promise<Picture> {
    const loadingPopup = this.popupService.getLoadingAlertPopup("Uploading picture");
    loadingPopup.present();
    const pictureDto = new Picture(null, null);

    return this.pictureService.uploadImageToCloudinary(picture)
      .then((uploadData) => {
        pictureDto.url = JSON.parse(uploadData['response'])['url'];
        pictureDto.externalIdentifier = JSON.parse(uploadData['response'])['public_id'];
        return this.pictureService.persistPictureToBackend(pictureDto);
    })
      .then(() => {
        loadingPopup.dismiss();
        return pictureDto;
      })
  }

}
