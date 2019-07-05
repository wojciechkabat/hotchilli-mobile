import {Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Config} from "ionic-angular";
import {Messages} from "./messages";
import { Globalization } from "@ionic-native/globalization";

@Injectable()
export class LanguageService {
  private DEFAULT_LANGUAGE = 'en';
  private language = this.DEFAULT_LANGUAGE;
  private translatedLanguages = ['en', 'pl'];
  private _messages = {};
  private userLocaleCountry;

  constructor(private translateService: TranslateService,
              private globalization: Globalization,
              private config: Config) {}

  initTranslations() {
    this.globalization.getLocaleName().then(localeName => {
      this.userLocaleCountry = localeName.value.split('-')[1];
    });

    this.translateService.setDefaultLang(this.DEFAULT_LANGUAGE);
    const browserLang = this.translateService.getBrowserLang();
    if (browserLang) {
      this.language = browserLang;
      this.translateService.use(this.getLanguage());
    } else {
      this.translateService.use('en');
    }

    this.translateService.get(['BACK_BUTTON_TEXT']).subscribe(() => {
      this.config.set('ios', 'backButtonText', '');
    });

    this.translateService.get(Messages.RUNTIME_MESSAGES).subscribe(values => {
      this._messages = values;
    });
  }

  get messages() {
    return this._messages;
  }

  getLanguage() {
    return this.translatedLanguages.indexOf(this.language) !== -1 ? this.language : this.DEFAULT_LANGUAGE;
  }

  getUserLocaleLanguage() {
    const browserLang = this.translateService.getBrowserLang();
    return browserLang? browserLang : 'en';
  }

  getUserLocaleCountry() {
    return this.userLocaleCountry;
  }
}
