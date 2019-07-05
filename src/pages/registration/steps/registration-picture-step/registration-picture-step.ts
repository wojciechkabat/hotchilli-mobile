import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { Picture } from "../../../../models/picture";
import { PopupService } from "../../../../providers/popupService";
import { PictureService } from "../../../../providers/pictureService";
import { Scroll, Slides } from "ionic-angular";

@Component({
  selector: 'registration-picture-step',
  templateUrl: 'registration-picture-step.html'
})
export class RegistrationPictureStepComponent {

  @Input()
  registrationForm: FormGroup;

  pictures: Picture[] = [];

  @Output()
  public nextClicked = new EventEmitter();

  @Output()
  public previousClicked = new EventEmitter();

  @Output()
  public picturesReady = new EventEmitter<Picture[]>();

  constructor(private popupService: PopupService, private pictureService: PictureService) {
  }

  goToNextSlide() {
    this.picturesReady.next(this.pictures);
    this.nextClicked.next()
  }

  addPicture() {
    if (this.pictures.length >= 4) {
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
}
