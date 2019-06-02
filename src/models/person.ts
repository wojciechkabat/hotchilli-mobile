import { Picture } from "./picture";

export class Person {
  id: number;
  username: string;
  age: number;
  pictures: Picture[];
  averageVote: number;
  voteCount: number;

  constructor() {}
}
