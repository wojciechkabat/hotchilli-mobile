export class UpdateProfileDto {
  username: string;
  dateOfBirth: Date;
  gender: string;


  constructor(username: string, dateOfBirth: Date, gender: string) {
    this.username = username;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
  }
}
