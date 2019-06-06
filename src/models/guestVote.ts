import { Vote } from "./vote";

export class GuestVote extends Vote {
  deviceId: string;

  constructor(ratedUserId: number, rating: number, deviceId: string) {
    super(ratedUserId, rating);
    this.deviceId = deviceId;
  }
}
