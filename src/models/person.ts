import { Picture } from "./picture";

export class Person {
  id: number;
  username: string;
  age: number;
  dateOfBirth: Date;
  pictures: Picture[];
  averageRating: number;
  voteCount: number;
  gender: string;

  constructor() {}
}
