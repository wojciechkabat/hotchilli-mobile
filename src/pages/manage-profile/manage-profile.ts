import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from "../../providers/userService";
import { Picture } from "../../models/picture";
import { PopupService } from "../../providers/popupService";
import { PictureService } from "../../providers/pictureService";
import { tap } from "rxjs/operators";
import { LoginService } from "../../providers/loginService";

@IonicPage()
@Component({
  selector: 'page-manage-profile',
  templateUrl: 'manage-profile.html',
})
export class ManageProfilePage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private pictureService: PictureService,
              private popupService: PopupService,
              private loginService: LoginService,
              public userService: UserService) {
  }

  addPicture() {
    if (this.userService.userData.pictures.length >= 4) {
      this.popupService.displayToast('A maximum of 4 pictures is allowed');
      return;
    }
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

  showPictureOptions(picture: Picture) {
    let options = [
      {
        text: 'Show full screen',
        icon: 'eye',
        handler: () => this.showFullScreen(picture.url)
      },
      {
        text: 'Delete picture',
        icon: 'trash',
        handler: () => this.deletePicture(picture)
      }
    ];
    let actionSheet = this.popupService.getActionSheet('Picture options', options);
    actionSheet.present();
  }

  private showFullScreen(pictureUrl: string) {
    this.pictureService.showPictureFullScreen(pictureUrl);
  }

  private deletePicture(picture: Picture) {
    const confirmingPopup = this.popupService.getConfirmingAlertPopup(
      "Confirm deletion",
      "Are you sure you want to delete this picture?",
      "Cancel",
      "Delete",
      () => {},
      () => {
        const deleteLoading = this.popupService.getLoadingAlertPopup("Deleting picture...");
        deleteLoading.present();
        this.pictureService.deletePicture(picture.id).subscribe(() => {
          this.userService.userData.pictures.splice(this.userService.userData.pictures.indexOf(picture),1);
          deleteLoading.dismiss()
        },() => {
          this.popupService.getInformationAlertPopup("Deletion failed", "Could not delete picture. An error occurred", "OK")
          deleteLoading.dismiss()
        })
      }
    );
    confirmingPopup.present();
  }

  takePicture() {
    this.pictureService.takePhoto().then(picture => {
      this.uploadPicture(picture).then((picture) => {
        this.userService.userData.pictures.push(picture)
      })
    })
      .catch(() => {
        console.log('error taking picture');
      });
  }

  getPictureFromFile() {
    this.pictureService.getImageFromFile().then(picture => {
      this.uploadPicture(picture).then((picture) => {
        this.userService.userData.pictures.push(picture)
      })
    })
      .catch(() => {
        console.log('error getting picture from file');
      });
  }

  deleteAccountClicked() {
    const confirmingPopup = this.popupService.getConfirmingAlertPopup(
      "Confirm account deleting",
      "Are you sure you want to delete your account? This action is <b>impossible to revert</b>. You will lose your pictures and vote ratings",
      "Cancel",
      "Delete",
      () => {},
      () => {
        const deleteLoading = this.popupService.getLoadingAlertPopup("Deleting account...");
        this.loginService.deleteAccount().subscribe(() => {
          deleteLoading.dismiss();
          this.navCtrl.setRoot('VotingPage')
        }, () => {
          deleteLoading.dismiss();
        });
        deleteLoading.present();
      }
    );
    confirmingPopup.present();
  }

  private uploadPicture(picture: string): Promise<Picture> {
    const loadingPopup = this.popupService.getLoadingAlertPopup("Uploading picture");
    loadingPopup.present();

    return this.pictureService.uploadImageToCloudinary(picture)
      .then((uploadData) => {
        const url = JSON.parse(uploadData['response'])['url'];
        const externalIdentifier = JSON.parse(uploadData['response'])['public_id'];
        return this.pictureService.persistPictureToBackend(new Picture(externalIdentifier, url));
    })
      .then((pictureDto) => {
        loadingPopup.dismiss();
        return pictureDto;
      })
  }

}
