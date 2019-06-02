export class Vote {
  ratedUserId: number;
  rating: number;


  constructor(ratedUserId: number, rating: number) {
    this.ratedUserId = ratedUserId;
    this.rating = rating;
  }
}
