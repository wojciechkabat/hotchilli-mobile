import { Injectable } from '@angular/core';
import { Facebook } from "@ionic-native/facebook";

@Injectable()
export class FacebookProvider {
  private isLoggedWithFacebook: boolean;

  constructor(private facebook: Facebook) {
  }

  loginToFacebook(): Promise<string> {
    return this.facebook.login(['email', 'public_profile', 'user_gender', 'user_birthday'])
      .then((result) => {
        this.isLoggedWithFacebook = true;
        return result.authResponse.accessToken;
      })
  }

  logoutFromFacebook() {
    return this.isLoggedWithFacebook ? this.facebook.logout().then(() => this.isLoggedWithFacebook = false) : Promise.resolve();
  }
}
