import { Injectable } from '@angular/core';
import { LanguageService } from "./languageService";


@Injectable()
export class PrivacyPolicyService {
  private supportedTClanguages = ['pl', 'en'];

  constructor(private languageService: LanguageService) {}

  getPrivacyPolicyLink() {
    let userLanguage = this.languageService.getUserLocaleLanguage();
    if(this.supportedTClanguages.indexOf(userLanguage) !== -1) {
      return `https://giftboxapplication.com/privacy-policy-${userLanguage}`;
    }
    return `https://giftboxapplication.com/privacy-policy-en`;
  }

}
