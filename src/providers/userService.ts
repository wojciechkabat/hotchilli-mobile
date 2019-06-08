import { Injectable } from "@angular/core";
import { Api } from "./api";
import { Observable } from "rxjs/Observable";
import { LoginDto } from "../models/loginDto";
import { TokensResponseDto } from "../models/tokensResponseDto";
import { tap } from "rxjs/operators";
import { Storage } from '@ionic/storage';
import { Device } from "@ionic-native/device";

@Injectable()
export class UserService {
  isLoggedIn: boolean;
  deviceId: string;

  constructor(private device: Device) {
    this.deviceId = this.device.platform ? this.device.uuid : 'someMockPcDeviceId';
  }
}
