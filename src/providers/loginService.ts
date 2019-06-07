import { Injectable } from "@angular/core";
import { Api } from "./api";
import { Observable } from "rxjs/Observable";
import { LoginDto } from "../models/loginDto";
import { TokensResponseDto } from "../models/tokensResponseDto";
import { tap } from "rxjs/operators";
import { Storage } from '@ionic/storage';
import { UserService } from "./userService";

@Injectable()
export class LoginService {
  private accessToken: string;
  private refreshTokenId: string;

  constructor(private storage: Storage,
              private userService: UserService,
              private apiService: Api) {

  }

  loginWithCredentials(userLoginDto: LoginDto): Observable<TokensResponseDto> {
     userLoginDto.deviceId = 'sadsad'; //fixme mock for now
    // userLoginDto.login = '123@pl.pl';
    // userLoginDto.password = '123456Kk';

    return this.callApiToLoginWithCredentials(userLoginDto)
      .pipe(
        tap((tokens: TokensResponseDto) => this.initializeTokens(tokens.accessToken, tokens.refreshTokenId)),
        tap(() => this.userService.isLoggedIn = true)
      )
  }

  logOut(deviceId: string): Observable<void> {
    return this.apiService.get(`/api/auth/log-out/${deviceId}`);
  }


  initializeTokens(accessToken: string, refreshTokenId: string) {
    this.accessToken = accessToken;
    this.refreshTokenId = refreshTokenId;
    this.storage.set('applicationTokens', {
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
