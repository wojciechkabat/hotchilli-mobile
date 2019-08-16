import { Injectable } from '@angular/core';
import { Facebook } from "@ionic-native/facebook";
import { Api } from "./api";
import { HttpHeaders } from "@angular/common/http";
import { FacebookPhoto } from "../models/facebookPhoto";

@Injectable()
export class FacebookProvider {
  private isLoggedWithFacebook: boolean;
  private fetchedFacebookPictures: FacebookPhoto[];

  constructor(private facebook: Facebook, private apiService: Api) {
  }

  loginToFacebook(): Promise<string> {
    this.isLoggedWithFacebook = true;
    return this.facebook.login(['email', 'public_profile', 'user_gender', 'user_birthday', 'user_photos'])
      .then((result) => {
        this.isLoggedWithFacebook = true;
        return result.authResponse.accessToken;
      })
  }

  logoutFromFacebook() {
    //fixme use it
    return this.isLoggedWithFacebook ? this.facebook.logout().then(() => this.isLoggedWithFacebook = false) : Promise.resolve();
  }

  getUserFacebookPictures(): Promise<FacebookPhoto[]> {
    if (this.fetchedFacebookPictures) {
      return Promise.resolve(this.fetchedFacebookPictures);
    }
    return this.facebook.getAccessToken().then((fbAccessToken) => {
      if (!fbAccessToken) {
        return []
      }
      const headers = new HttpHeaders({'fb-access-token': fbAccessToken});
      return this.apiService.getWithHeaders<FacebookPhoto[]>("pictures/fb", headers)
        .toPromise()
        .then((photos) => this.fetchedFacebookPictures = photos)
    })
  }
}
