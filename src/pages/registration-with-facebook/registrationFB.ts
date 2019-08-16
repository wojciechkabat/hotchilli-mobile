import { Component, Input, ViewChild } from '@angular/core';
import {
  Alert,
  IonicPage,
  MenuController,
  NavController,
  NavParams,
  Platform,
  Slides,
  ViewController
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "../../providers/loginService";
import { PopupService } from "../../providers/popupService";
import { PictureService } from "../../providers/pictureService";
import { BackButtonService } from "../../providers/backButtonService";
import { LanguageService } from "../../providers/languageService";
import { Picture } from "../../models/picture";
import { Person } from "../../models/person";
import { FacebookPostRegistrationDto } from "../../models/facebookPostRegistrationDto";
import { UserService } from "../../providers/userService";

@IonicPage()
@Component({
  selector: 'page-registrationFB',
  templateUrl: 'registrationFB.html',
})
export class RegistrationFBPage {
  @ViewChild(Slides) slides: Slides;

  registrationForm: FormGroup;
  userPictures: Picture[];
  abortRegistrationAlert: Alert;

  pictures: Picture[] = [];

  readonly REGISTRATION_STEPS = {
    DATA_STEP: 0,
    PICTURE_STEP: 1,
    PRIVACY_POLICY_STEP: 2
  };

  constructor(public navCtrl: NavController,
              private formBuilder: FormBuilder,
              private params: NavParams,
              private loginService: LoginService,
              private popupService: PopupService,
              private languageService: LanguageService,
              private pictureService: PictureService,
              private backButtonService: BackButtonService,
              private userService: UserService,
              private viewCtrl: ViewController) {
    const userData: Person = params.get('userData');
    this.registrationForm = this.formBuilder.group({
      username: [userData.username, Validators.required],
      sex: [userData.gender, Validators.required],
      birthday: [userData.dateOfBirth],
    }, {
      validator: [
        this.validateNamesComplexity()
      ]
    });
  }

  ionViewDidEnter() {
    this.createAlertInstance();
    this.backButtonService.registerRegistrationFormBackButtonAction(this.abortRegistrationAlert);
  }

  ionViewWillLeave() {
    this.backButtonService.unregisterCustomBackButtonAction();
  }

  ionViewDidLoad() {
    this.slides.lockSwipes(true);
  }

  register() {
    if (this.registrationForm.valid) {
      this.popupService.displayAccountCreationLoading();
      this.handlePictureUploadIfNecessary().then(() => {
        const postRegistrationDto: FacebookPostRegistrationDto = {
          username: this.registrationForm.value.username.trim(),
          pictures: this.userPictures,
          gender: this.registrationForm.value.sex,
          dateOfBirth: this.registrationForm.value.birthday,
        };
        this.userService.postRegisterFacebookUser(postRegistrationDto)
          .subscribe(() => this.viewCtrl.dismiss(true),
            (error) => {
              this.viewCtrl.dismiss(false);
              this.handleRegistrationError(error)
            })
      })
        .catch((error) => {
          this.handleRegistrationError(error)
        });
    }
  }

  shouldDisplayPager() {
    return window.innerHeight > 500;
  }

  goToPictureStep() {
    this.registrationForm.controls['username'].markAsTouched();
    this.registrationForm.controls['sex'].markAsTouched();
    if (this.registrationForm.value.sex && this.registrationForm.value.username &&
      !this.registrationForm.hasError('wrongNameOrSurnameFormat') &&
      !this.registrationForm.hasError('nameOrSurnameContainsNumbers')) {
      this.goToSlide(this.REGISTRATION_STEPS.PICTURE_STEP)
    }
  }

  goToPrivacyPolicyStep() {
    if (this.userPictures.length === 0) {
      this.popupService.displayToast(this.languageService.messages['ADD_AT_LEAST_1_PICTURE_MESSAGE']);
      return;
    }
    if (this.registrationForm.valid) {
      this.goToSlide(this.REGISTRATION_STEPS.PRIVACY_POLICY_STEP)
    }
  }

  abortRegistration() {
    this.abortRegistrationAlert.present();
  }

  private goToSlide(slideNo) {
    this.slides.lockSwipes(false);
    this.slides.slideTo(slideNo, 500);
    this.slides.lockSwipes(true);
  }

  goToPrevious() {
    this.slides.lockSwipes(false);
    this.slides.slidePrev(500);
    this.slides.lockSwipes(true);
  }

  private validateNamesComplexity() {
    return (group: FormGroup): { [key: string]: any } => {
      let username = group.controls['username'];

      if (username.value.length < 3) {
        return {
          wrongNameOrSurnameFormat: true
        };
      }
    }
  }

  private handlePictureUploadIfNecessary(): Promise<any> {
    if (this.userPictures.length > 0) {
      const uploadPromises: Promise<any>[] = [];
      for (const picture of this.userPictures) {
        if (!picture.externalIdentifier) {
          if (picture.hasRemoteUrl) {
            uploadPromises.push(
              this.pictureService.uploadRemoteUrlImageToCloudinary(picture.url)
                .then((pictureUploadResponse) => {
                  picture.url = pictureUploadResponse['secure_url'];
                  picture.externalIdentifier = pictureUploadResponse['public_id'];
                })
            )
          } else {
            uploadPromises.push(
              this.pictureService.uploadImageToCloudinary(picture.url)
                .then((pictureUploadResponse) => {
                  picture.url = JSON.parse(pictureUploadResponse['response'])['url'];
                  picture.externalIdentifier = JSON.parse(pictureUploadResponse['response'])['public_id'];
                })
            )
          }
        }
      }
      return Promise.all(uploadPromises)
    } else {
      return Promise.resolve();
    }
  }

  private handleRegistrationError(error) {
    this.popupService.displayToast(this.languageService.messages['REGISTRATION_ERROR_MESSAGE']);
    this.popupService.hideAccountCreationLoading();
  }

  private createAlertInstance() {
    this.abortRegistrationAlert = this.popupService.getConfirmingAlertPopup(
      this.languageService.messages['CANCEL_ACCOUNT_CREATION_TITLE'],
      this.languageService.messages['CANCEL_ACCOUNT_CREATION_MESSAGE'],
      this.languageService.messages['NO_LABEL'],
      this.languageService.messages['YES_LABEL'],
      () => {
        this.createAlertInstance();
        this.backButtonService.registerRegistrationFormBackButtonAction(this.abortRegistrationAlert);
      },
      () => {
        if (this.navCtrl.canGoBack()) {
          this.navCtrl.pop()
        } else {
          this.navCtrl.setRoot('LoginPage')
        }
      }
    );
  }
}
