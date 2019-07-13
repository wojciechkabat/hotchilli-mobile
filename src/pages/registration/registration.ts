import { Component, ViewChild } from '@angular/core';
import { Alert, IonicPage, MenuController, NavController, Platform, Slides } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../providers/userService";
import { LoginService } from "../../providers/loginService";
import { flatMap } from "rxjs/operators";
import { PopupService } from "../../providers/popupService";
import { PictureService } from "../../providers/pictureService";
import { BackButtonService } from "../../providers/backButtonService";
import { LanguageService } from "../../providers/languageService";
import { RegistrationDto } from "../../models/registrationDto";
import { LoginDto } from "../../models/loginDto";
import { Picture } from "../../models/picture";
import { Constants } from "../../providers/constants";

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {
  @ViewChild(Slides) slides: Slides;

  registrationForm: FormGroup;
  userPictures: Picture[];
  abortRegistrationAlert: Alert;

  pictures: Picture[] = [];

  readonly REGISTRATION_STEPS = {
    CREDENTIALS_STEP: 0,
    NAME_STEP: 1,
    BIRTHDAY_GENDER_STEP: 2,
    PICTURE_STEP: 3,
    PRIVACY_POLICY_STEP: 4
  };

  constructor(public navCtrl: NavController,
              private formBuilder: FormBuilder,
              private menu: MenuController,
              private loginService: LoginService,
              private popupService: PopupService,
              private languageService: LanguageService,
              private pictureService: PictureService,
              private backButtonService: BackButtonService,
              private userService: UserService) {
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      sex: ['', Validators.required],
      birthday: [new Date()],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).*$')]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: [
        this.validateMatchingPasswords('password', 'confirmPassword'),
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
        const registrationDto: RegistrationDto = {
          username: this.registrationForm.value.username.trim(),
          email: this.registrationForm.value.email.trim(),
          password: this.registrationForm.value.password,
          pictures: this.userPictures,
          gender: this.registrationForm.value.sex,
          dateOfBirth: this.registrationForm.value.birthday,
          languageCode: this.languageService.getUserLocaleLanguage()
        };

        this.userService.registerAccount(registrationDto).pipe(
          flatMap(() => {
            const loginDto: LoginDto = {
              login: registrationDto.email,
              password: registrationDto.password,
              deviceId: null
            };
            return this.loginService.loginWithCredentials(loginDto)
          })
        ).subscribe(
          () => {
            this.popupService.hideAccountCreationLoading();
            this.navCtrl.setRoot('VotingPage')
          },
          (error) => this.handleRegistrationError(error)
        );
      }).catch((error) => this.handleRegistrationError(error))
    }
  }

  shouldDisplayPager() {
    return window.innerHeight > 500;
  }

  goToNamesStep() {
    this.registrationForm.controls['email'].markAsTouched();
    this.registrationForm.controls['password'].markAsTouched();
    this.registrationForm.controls['confirmPassword'].markAsTouched();
    if (this.registrationForm.controls['email'].valid
      && this.registrationForm.controls['password'].valid
      && this.registrationForm.controls['confirmPassword'].valid
      && !this.registrationForm.hasError('mismatchedPasswords')) {
      this.goToSlide(this.REGISTRATION_STEPS.NAME_STEP)
    }
  }

  goToBirthdayGenderStep() {
    this.registrationForm.controls['username'].markAsTouched();
    if (this.registrationForm.value.username &&
      !this.registrationForm.hasError('wrongNameOrSurnameFormat') &&
      !this.registrationForm.hasError('nameOrSurnameContainsNumbers')) {
      this.goToSlide(this.REGISTRATION_STEPS.BIRTHDAY_GENDER_STEP)
    }
  }

  goToCredentialsStep() {
    this.registrationForm.controls['sex'].markAsTouched();
    if (this.registrationForm.value.sex && this.registrationForm.value.birthday) {
      this.goToSlide(this.REGISTRATION_STEPS.CREDENTIALS_STEP)
    }
  }


  goToPictureStep() {
    this.registrationForm.controls['sex'].markAsTouched();
    if (this.registrationForm.value.sex) {
      this.goToSlide(this.REGISTRATION_STEPS.PICTURE_STEP)
    }
  }

  goToPrivacyPolicyStep() {
    if(this.userPictures.length === 0) {
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

  private validateMatchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
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
        if(!picture.externalIdentifier) {
          uploadPromises.push(
            this.pictureService.uploadImageToCloudinary(picture.url)
              .then((pictureUploadResponse) => {
                picture.url = JSON.parse(pictureUploadResponse['response'])['url'];
                picture.externalIdentifier = JSON.parse(pictureUploadResponse['response'])['public_id'];
              })
          )
        }
      }
      return Promise.all(uploadPromises)
    } else {
      return Promise.resolve();
    }
  }

  private handleRegistrationError(error) {
    if (error && error.error && error.error.statusCode === Constants.ERROR_CODES.USERNAME_TAKEN) {
      this.goToCredentialsStep();
      this.popupService.displayToast(this.languageService.messages['ALREADY_AN_ACCOUNT_WITH_EMAIL_ERROR_MESSAGE']);
    } else if (error == 'CONFIRMATION_PIN_NOT_ENTERED') {
      this.navCtrl.setRoot('LoginPage').then(() => {
        this.popupService.displayToast(this.languageService.messages['YOU_HAVE_TO_ACTIVATE_ACCOUNT_MESSAGE']);
      });
    }
    else {
      this.popupService.displayToast(this.languageService.messages['REGISTRATION_ERROR_MESSAGE']);
    }
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
        if(this.navCtrl.canGoBack()) {
          this.navCtrl.pop()
        } else {
          this.navCtrl.setRoot('LoginPage')
        }
      }
    );
  }
}
