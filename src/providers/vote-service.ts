import { Injectable } from '@angular/core';
import { Api } from "./api";
import { Vote } from "../models/vote";
import { Observable } from "rxjs/Observable";
import { UserService } from "./userService";
import { GuestVote } from "../models/guestVote";

@Injectable()
export class VoteService {

  constructor(private apiService: Api, private userService: UserService) {}

  persistVote(vote: Vote): Observable<void> {
    if(this.userService.isLoggedIn) {
      return this.apiService.post('voting', vote);
    } else {
      return this.apiService.post('guest/voting', new GuestVote(vote.ratedUserId, vote.rating, this.userService.deviceId));
    }
  }

}
