import { Picture } from "./picture";

export interface FacebookPostRegistrationDto {
  username: string,
  pictures: Picture[],
  gender: string,
  dateOfBirth: Date,
}
