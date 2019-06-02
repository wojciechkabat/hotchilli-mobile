import { Picture } from "./picture";

export class Person {
  id: number;
  username: string;
  age: number;
  pictures: Picture[];
  averageRating: number;
  voteCount: number;

  constructor() {}
}
