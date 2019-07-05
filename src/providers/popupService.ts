import { Injectable } from '@angular/core';
import {
  ActionSheetController,
  AlertController, Loading,
  LoadingController,
  ModalController,
  PopoverController, ToastController
} from "ionic-angular";
import { LanguageService } from "./languageService";

@Injectable()
export class PopupService {
  //this instance had to be created for ios, due to a bug where modal was unresponsive when displayed at the same time as loading.
  //this caused issues during registration (when modal with PIN was opened), so the instance is necessary to present and hide loader
  private accountCreationLoadingAlert: Loading;

  constructor(private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private popoverCtrl: PopoverController,
              private modalCtrl: ModalController,
              private actionSheetCtrl: ActionSheetController,
              private languageService: LanguageService,
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

  displayAccountCreationLoading() {
    this.accountCreationLoadingAlert = this.getLoadingAlertPopup(this.languageService.messages['REGISTERING_ACCOUNT_LOADING_MESSAGE']);
    this.accountCreationLoadingAlert.present();
  }

  hideAccountCreationLoading() {
    if (this.accountCreationLoadingAlert) {
      this.accountCreationLoadingAlert.dismiss();
    }
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
