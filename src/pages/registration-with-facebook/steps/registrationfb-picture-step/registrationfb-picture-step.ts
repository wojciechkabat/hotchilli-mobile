import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { Picture } from "../../../../models/picture";
import { PopupService } from "../../../../providers/popupService";
import { PictureService } from "../../../../providers/pictureService";
import { LanguageService } from "../../../../providers/languageService";

@Component({
  selector: 'registrationfb-picture-step',
  templateUrl: 'registrationfb-picture-step.html'
})
export class RegistrationFBPictureStepComponent {

  @Input()
  registrationForm: FormGroup;

  pictures: Picture[] = [];

  @Output()
  public nextClicked = new EventEmitter();

  @Output()
  public previousClicked = new EventEmitter();

  @Output()
  public picturesReady = new EventEmitter<Picture[]>();

  constructor(private popupService: PopupService, private pictureService: PictureService, private languageService: LanguageService) {
  }

  goToNextSlide() {
    this.picturesReady.next(this.pictures);
    this.nextClicked.next()
  }

  addPicture() {
    if (this.pictures.length >= 4) {
      this.popupService.displayToast(this.languageService.messages['MAXIMUM_4_PICTURES_ALLOWED_MESSAGE']);
      return;
    }
    let options = [
      {
        text: this.languageService.messages['CHOOSE_PICTURE_FROM_FACEBOOK'],
        icon: 'logo-facebook',
        cssClass: 'facebook-icon',
        handler: () => this.choosePictureFromFacebookChosen()
      },
      {
        text: this.languageService.messages['TAKE_NEW_PICTURE_MESSAGE'],
        icon: 'camera',
        handler: () => this.takePicture()
      },
      {
        text: this.languageService.messages['CHOOSE_EXISTING_PICTURE_MESSAGE'],
        icon: 'image',
        handler: () => this.getPictureFromFile()
      }
    ];
    let actionSheet = this.popupService.getActionSheet(this.languageService.messages['CHOOSE_PICTURE_SOURCE_MESSAGE'], options);
    actionSheet.present();
  }

  takePicture() {
    this.pictureService.takePhoto().then(picture => {
      this.pictures.push(new Picture(null, picture))
    })
      .catch(() => {
        console.log('error taking picture');
      });
  }

  getPictureFromFile() {
    this.pictureService.getImageFromFile().then(picture => {
      this.pictures.push(new Picture(null, picture))
    })
      .catch(() => {
        console.log('error getting picture from file');
      });
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
    this.pictures.splice(this.pictures.indexOf(picture), 1);
  }

  private choosePictureFromFacebookChosen() {
    const accountConfirmModal = this.popupService.getModal(
      'FacebookPictureSelectPage',
      (selectedPicture) => {
        if (selectedPicture) {
          this.pictures.push(selectedPicture)
        }
      }, {});
    accountConfirmModal.present();
  }
}
