import { Injectable } from "@angular/core";
import { Api } from "./api";
import { Observable } from "rxjs/Observable";
import { LoginDto } from "../models/loginDto";
import { TokensResponseDto } from "../models/tokensResponseDto";
import { flatMap, tap } from "rxjs/operators";
import { Storage } from '@ionic/storage';
import { UserService } from "./userService";
import { Person } from "../models/person";

@Injectable()
export class LoginService {
  private accessToken: string;
  private refreshTokenId: string;

  constructor(private storage: Storage,
              private userService: UserService,
              private apiService: Api) {

  }

  loginWithCredentials(userLoginDto: LoginDto): Observable<Person> {
    userLoginDto.deviceId = this.userService.deviceId;

    return this.callApiToLoginWithCredentials(userLoginDto)
      .pipe(
        tap((tokens: TokensResponseDto) => this.initializeTokens(tokens.accessToken, tokens.refreshTokenId)),
        flatMap(() => this.continueLogin())
      );
  }

  continueLogin(): Observable<Person> {
    return this.userService.getMyInformation().pipe(
      tap(() => this.userService.isLoggedIn = true)
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


  initializeTokens(accessToken: string, refreshTokenId: string): Promise<void> {
    this.accessToken = accessToken;
    this.refreshTokenId = refreshTokenId;
    return this.storage.set('applicationTokens', {
      accessToken: this.accessToken,
      refreshTokenId: this.refreshTokenId
    })
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
}
