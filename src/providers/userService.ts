import { Injectable } from "@angular/core";
import { Api } from "./api";
import { Observable } from "rxjs/Observable";
import { tap } from "rxjs/operators";
import { Device } from "@ionic-native/device";
import { Person } from "../models/person";
import { LocalSettings } from "../models/localSettings";
import { Storage } from "@ionic/storage";
import { Constants } from "./constants";
import { UpdateProfileDto } from "../models/updateProfileDto";
import { RegistrationDto } from "../models/registrationDto";
import { FacebookPostRegistrationDto } from "../models/facebookPostRegistrationDto";

@Injectable()
export class UserService {
  isLoggedIn: boolean;
  deviceId: string;
  userData: Person;
  localSettings: LocalSettings;
  isCompleteRefreshRequired: boolean;

  constructor(private device: Device, private apiService: Api, private storage: Storage) {
    this.deviceId = this.device.platform ? this.device.uuid : 'someMockPcDeviceId';
    this.storage.get('localSettings').then((settings) => {
      this.localSettings = settings;
    });
    if(!this.localSettings) {
      this.updateLocalSettings(Constants.DEFAULT_SETTINGS);
    }
  }

  isAccountActive(): Observable<boolean> {
    return this.apiService.get(`account/active`)
  }

  confirmAccount(pin: string): Observable<void> {
    return this.apiService.put('registration/confirmation', pin);
  }

  resendConfirmationEmail(): Observable<void> {
    return this.apiService.get('registration/confirmation/resend');
  }

  getMyInformation(): Observable<Person> {
    return this.apiService.get(`users/me`)
      .pipe(
        tap((userData: Person) => this.userData = userData)
      )
  }

  updateProfileInformation(updateProfileDto: UpdateProfileDto): Observable<Person> {
      return this.apiService.put(`users/me`, updateProfileDto)
        .pipe(
          tap((userData: Person) => this.userData = userData)
        )
  }

  postRegisterFacebookUser(postRegistrationDto: FacebookPostRegistrationDto): Observable<void> {
    return this.apiService.put('registration/post-fb', postRegistrationDto);
  }

  clearUserData() {
    this.userData = null;
  }

  updateLocalSettings(localSettings: LocalSettings) {
    this.localSettings = localSettings;
    this.storage.set('localSettings', localSettings);
  }

  registerAccount(registrationDto: RegistrationDto): Observable<void> {
    return this.apiService.post('registration', registrationDto)
  }
}
