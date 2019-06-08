import { Injectable } from "@angular/core";
import { Api } from "./api";
import { Observable } from "rxjs/Observable";
import { tap } from "rxjs/operators";
import { Device } from "@ionic-native/device";
import { Person } from "../models/person";

@Injectable()
export class UserService {
  isLoggedIn: boolean;
  deviceId: string;
  userData: Person;

  constructor(private device: Device, private apiService: Api) {
    this.deviceId = this.device.platform ? this.device.uuid : 'someMockPcDeviceId';
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
}
