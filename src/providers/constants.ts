import { LocalSettings } from "../models/localSettings";

export class Constants {
  public static APP_VERSION = '1.0.0';
  public static API_ENDPOINT= 'http://192.168.1.172:8080';
  public static PICTURE_UPLOAD_ENDPOINT= 'https://api.cloudinary.com/v1_1/hotchillicloud/image/upload';

  public static ERROR_CODES = {
    USERNAME_TAKEN: 421,
    UNAUTHENTICATED: 403,
    GUEST_VOTE_LIMIT_EXCEEDED: 521,
  };

  public static DEFAULT_SETTINGS: LocalSettings = {
    displayOption: 'ALL'
  }
}
