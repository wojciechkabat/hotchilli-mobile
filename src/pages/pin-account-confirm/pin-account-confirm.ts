import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../providers/userService";
import { PopupService } from "../../providers/popupService";
import { LanguageService } from "../../providers/languageService";

@IonicPage()
@Component({
  selector: 'page-pin-account-confirm',
  templateUrl: 'pin-account-confirm.html',
})
export class PinAccountConfirmPage {

  confirmationForm: FormGroup;
  isDataLoading: boolean;
  isResendingMail: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private userService: UserService,
              private popupService: PopupService,
              private languageService: LanguageService,
              public viewCtrl: ViewController,
              private formBuilder: FormBuilder) {
    this.confirmationForm = this.formBuilder.group({
      confirmationPin: ['', Validators.required],
    })
  }

  confirmPin() {
    this.isDataLoading = true;
    this.userService.confirmAccount(this.confirmationForm.value.confirmationPin).subscribe(
      () => {
        this.isDataLoading = false;
        this.viewCtrl.dismiss(true)
      },
      () => {
        this.isDataLoading = false;
        this.popupService.getInformationAlertPopup(
          this.languageService.messages['WRONG_PIN_TITLE'],
          this.languageService.messages['WRONG_PIN_MESSAGE'],
          'OK'
        ).present()
      }
    );
  }

  resendEmail() {
    // let alert = this.popupService.getConfirmingAlertPopup(
    //   this.languageService.messages['SEND_EMAIL_AGAIN'],
    //   this.languageService.messages['SEND_EMAIL_AGAIN_CONFIRM_MESSAGE'],
    //   this.languageService.messages['CANCEL_MESSAGE'],
    //   this.languageService.messages['SEND_MESSAGE'],
    //   null,
    //   () => {
    //     this.isResendingMail = true;
    //     this.userService.resendConfirmationEmail().subscribe(() => {
    //         this.isResendingMail = false;
    //         this.popupService.displayToast(this.languageService.messages['EMAIL_RESENT_SUCCESS_MESSAGE'])
    //       },
    //       () => {
    //         this.isResendingMail = false;
    //         this.popupService.displayToast(this.languageService.messages['EMAIL_RESENT_ERROR_MESSAGE'])
    //       }
    //     );
    //   });
    // alert.present();
  }
}
