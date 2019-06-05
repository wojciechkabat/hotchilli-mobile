import { Injectable } from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  LoadingController,
  ModalController,
  PopoverController, ToastController
} from "ionic-angular";

@Injectable()
export class PopupService {
  constructor(private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private popoverCtrl: PopoverController,
              private modalCtrl: ModalController,
              private actionSheetCtrl: ActionSheetController,
              private toastController: ToastController,
  ) {

  }

  getActionSheet(title: string, options: any) {
    return this.actionSheetCtrl.create({
      title: title,
      buttons: options
    });

  }

  getLoadingAlertPopup(text: string) {
    return this.loadingCtrl.create({
      content: text,
      spinner: 'crescent'
    });
  }

  getInformationAlertPopup(title: string,
                           message: string,
                           buttonText: string) {
    return this.alertCtrl.create({
      title: title,
      message: message,
      enableBackdropDismiss: false,
      buttons: [
        {
          text: buttonText
        }
      ]
    });
  }

  getConfirmingAlertPopup(title: string,
                          message: string,
                          negativeButtonText: string,
                          positiveButtonText: string,
                          negativeHandler,
                          positiveHandler) {
    return this.alertCtrl.create({
      title: title,
      message: message,
      enableBackdropDismiss: false,
      buttons: [
        {
          text: negativeButtonText,
          handler: negativeHandler
        },
        {
          text: positiveButtonText,
          handler: positiveHandler
        }
      ]
    });
  }

  getModal(modalComponent, dismissHandler) {
    let modal = this.modalCtrl.create(modalComponent);
    modal.onDidDismiss((dismissData) => dismissHandler(dismissData));
    return modal;
  }

  displayToast(message: string) {
    let toast = this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      dismissOnPageChange: true
    });
    toast.present();
  }

}
