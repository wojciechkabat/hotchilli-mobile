import { Injectable } from "@angular/core";
import { Api } from "./api";
import { Observable } from "rxjs/Observable";
import { tap } from "rxjs/operators";
import { Device } from "@ionic-native/device";
import { Person } from "../models/person";
import { LocalSettings } from "../models/localSettings";
import { Storage } from "@ionic/storage";
import { Constants } from "./constants";

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

  getMyInformation(): Observable<Person> {
    return this.apiService.get(`users/me`)
      .pipe(
        tap((userData: Person) => this.userData = userData)
      )
  }

  clearUserData() {
    this.userData = null;
  }

  updateLocalSettings(localSettings: LocalSettings) {
    this.localSettings = localSettings;
    this.storage.set('localSettings', localSettings);
  }
}
