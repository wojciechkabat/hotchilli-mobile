import { Injectable } from '@angular/core';
import { Api } from "./api";
import { Vote } from "../models/vote";
import { Observable } from "rxjs/Observable";
import { UserService } from "./userService";
import { GuestVote } from "../models/guestVote";
import { Device } from '@ionic-native/device';

@Injectable()
export class VoteService {
  private readonly deviceId: string;

  constructor(private apiService: Api, private userService: UserService, private device: Device) {
    this.deviceId = this.device.platform ? this.device.uuid : 'someMockPcDeviceId';
  }

  persistVote(vote: Vote): Observable<void> {
    if(this.userService.isLoggedIn) {
      return this.apiService.post('voting', vote);
    } else {
      return this.apiService.post('guest/voting', new GuestVote(vote.ratedUserId, vote.rating, this.deviceId));
    }
  }

}
