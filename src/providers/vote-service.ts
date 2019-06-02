import { Injectable } from '@angular/core';
import { Api } from "./api";
import { Vote } from "../models/vote";
import { Observable } from "rxjs/Observable";

@Injectable()
export class VoteService {

  constructor(private apiService: Api) {}

  persistVote(vote: Vote): Observable<void> {
    return this.apiService.post('voting', vote);
  }

}
