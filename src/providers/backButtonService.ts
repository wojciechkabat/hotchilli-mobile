import { Injectable } from '@angular/core';
import { Alert, MenuController, Platform, Popover, ToastController } from "ionic-angular";

@Injectable()
export class BackButtonService {

  private counter = 0;
  private toastDisplayTime = 1000;
  private unregisterCallback;
  private isRegistered: boolean = false;

  constructor(
    private platform: Platform,
    private toastCtrl: ToastController,
    private menu: MenuController) {
  }


  registerAppExitBackButtonAction() {
    if (!this.isRegistered) {
      this.unregisterCallback = this.platform.registerBackButtonAction(() => {

        if (this.menu.isOpen()) {
          this.menu.close();
          return;
        }

        if (this.counter == 0) {
          this.counter++;
          this.presentToast();
          setTimeout(() => {
            this.counter = 0
          }, this.toastDisplayTime)
        } else {
          this.platform.exitApp();
        }
      }, 101);
      this.isRegistered = true;
    }
  }

  registerCustomBackButtonAction(callback: Function) {
    if (this.isRegistered) {
      this.unregisterCallback();
    }
    this.unregisterCallback = this.platform.registerBackButtonAction(callback);
    this.isRegistered = true;
  }

  unregisterCustomBackButtonAction() {
    this.unregisterCallback();
    this.isRegistered = false;
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'PRESS_AGAIN_TO_EXIT_TEXT',
      duration: this.toastDisplayTime,
      position: "bottom"
    });
    toast.present();
  }
}
