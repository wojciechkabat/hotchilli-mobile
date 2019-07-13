import { Picture } from "./picture";

export interface RegistrationDto {
  username: string,
  email: string,
  password: string,
  pictures: Picture[],
  gender: string,
  dateOfBirth: Date,
  languageCode: string
}
