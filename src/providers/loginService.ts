import { Injectable } from "@angular/core";
import { Api } from "./api";
import { Observable } from "rxjs/Observable";
import { LoginDto } from "../models/loginDto";
import { TokensResponseDto } from "../models/tokensResponseDto";
import { flatMap, tap } from "rxjs/operators";
import { Storage } from '@ionic/storage';
import { UserService } from "./userService";
import { PopupService } from "./popupService";
import { fromPromise } from 'rxjs/observable/fromPromise';
import { FacebookProvider } from "./facebookProvider";
import { LanguageService } from "./languageService";
import { HttpHeaders } from "@angular/common/http";

@Injectable()
export class LoginService {
  private accessToken: string;
  private refreshTokenId: string;

  constructor(private storage: Storage,
              private userService: UserService,
              private popupService: PopupService,
              private languageService: LanguageService,
              private facebookProvider: FacebookProvider,
              private apiService: Api) {

  }

  loginWithFacebook() {
    return fromPromise(this.facebookProvider.loginToFacebook()).pipe(
      flatMap((fbAccessToken) => this.callApiToLoginWithFacebook(fbAccessToken)),
      tap((tokens: TokensResponseDto) => this.initializeTokens(tokens.accessToken, tokens.refreshTokenId)),
      flatMap(() => this.userService.isAccountActive()),
      flatMap((isActive) => {
        if (isActive) {
          return this.continueLogin()
        } else {
          return fromPromise(this.displayFacebookRegistrationForm())
            .pipe(
              flatMap(
                () => this.continueLogin(),
                (error) => Observable.throw(error)
              )
            )
        }
      })
    )
  }

  loginWithCredentials(userLoginDto: LoginDto) {
    userLoginDto.deviceId = this.userService.deviceId;

    return this.callApiToLoginWithCredentials(userLoginDto)
      .pipe(
        tap((tokens: TokensResponseDto) => this.initializeTokens(tokens.accessToken, tokens.refreshTokenId)),
        flatMap(() => this.userService.isAccountActive()),
        flatMap((isAccountActive) => {
          if (isAccountActive) {
            return this.continueLogin();
          }
          return fromPromise(this.askForPinAccountConfirmation())
            .pipe(
              flatMap(
                () => this.continueLogin(),
                (error) => Observable.throw(error)
              )
            )
        })
      );
  }

  continueLogin(): Observable<any> {
    return this.userService.getMyInformation().pipe(
      tap(() => {
        this.userService.isLoggedIn = true;
        this.storage.set('applicationTokens', {
          accessToken: this.accessToken,
          refreshTokenId: this.refreshTokenId
        });
        //if logging in after confirming account with pin
        this.popupService.hideAccountCreationLoading();
      })
    )
  }

  logOut(): Observable<void | {}> {
    return this.apiService.get(`api/auth/log-out/${this.userService.deviceId}`)
      .pipe(
        tap(() => this.clearTokens()),
        tap(() => this.userService.isLoggedIn = false),
        tap(() => this.userService.clearUserData())
      )
  }

  deleteAccount(): Observable<void | {}> {
    return this.apiService.deleteHttp('users/me').pipe(
      tap(() => this.clearTokens()),
      tap(() => this.userService.isLoggedIn = false),
      tap(() => this.userService.clearUserData())
    )
  }


  initializeTokens(accessToken: string, refreshTokenId: string) {
    this.accessToken = accessToken;
    this.refreshTokenId = refreshTokenId;
  }

  clearTokens() {
    this.accessToken = null;
    this.refreshTokenId = null;
    this.storage.remove("applicationTokens");
  }

  refreshToken(): Observable<Object> {
    return this.apiService.get(`api/auth/token/${this.refreshTokenId}`)
      .pipe(tap(result => {
        this.accessToken = result['token'];
        this.storage.set("applicationTokens", {accessToken: this.accessToken, refreshTokenId: this.refreshTokenId})
      }))
  }

  getMyAccessToken(): string {
    return this.accessToken;
  }

  private callApiToLoginWithCredentials(loginDto: LoginDto): Observable<TokensResponseDto> {
    return this.apiService.post('login', loginDto);
  }

  private callApiToLoginWithFacebook(fbAccessToken: string): Observable<TokensResponseDto> {
    const headers = new HttpHeaders({'fb-access-token': fbAccessToken});
    const facebookLoginDto = {
      languageCode: this.languageService.getUserLocaleLanguage(),
      deviceId: this.userService.deviceId
    };
    return this.apiService.post('loginFB', facebookLoginDto, headers);
  }

  private askForPinAccountConfirmation(): Promise<string> {
    this.popupService.hideAccountCreationLoading();
    return new Promise((resolve, reject) => {
      const accountConfirmModal = this.popupService.getModal(
        'PinAccountConfirmPage',
        (isConfirmed) => {
          if (isConfirmed) {
            this.popupService.displayAccountCreationLoading();
          }
          return isConfirmed ? resolve() : reject('CONFIRMATION_PIN_NOT_ENTERED')
        },
        {});
      accountConfirmModal.present();
    })
  }

  private displayFacebookRegistrationForm(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.userService.getMyInformation().subscribe(userData => {
        const accountConfirmModal = this.popupService.getModal(
          'RegistrationFBPage',
          (isRegistered) => {
            return isRegistered ? resolve() : reject('FB_REGISTRATION_ABORTED')
          },
          {
            userData: userData
          });
        accountConfirmModal.present();
      }, (error) => reject(error))
    })
  }
}
