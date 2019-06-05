import {Injectable, NgModule} from "@angular/core";
import {HTTP_INTERCEPTORS, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/throw'
import {Events} from "ionic-angular";
import {Constants} from "./constants";
import { LoginService } from "./loginService";

@Injectable()
export class MyRequestInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService, private events: Events) {
  };

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(this.addToken(req, this.loginService.getMyAccessToken()))
      .catch(error => {
        if (error.status === Constants.ERROR_CODES.UNAUTHENTICATED && !this.isUrlExcludedFromTokenRefresh(req.url)) {
          return this.refreshTokenAndRetry(req, next);
        } else {
          return Observable.throw(error);
        }
      })
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return token? req.clone({setHeaders: {Authorization: 'Bearer ' + token}}) : req;
  }

  private refreshTokenAndRetry(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return this.loginService.refreshToken()
      .switchMap((result) => {
        if (result['token']) {
          return next.handle(this.addToken(req, result['token']));
        } else {
          return this.logoutUser();
        }
      })
      .catch(() => {
        return this.logoutUser()
      })
  }

  private logoutUser() {
    this.loginService.clearTokens();
    this.events.publish("LOGOUT_EVENT");
    return Observable.throw("Authentication error, logging out");
  }

  private isUrlExcludedFromTokenRefresh(url: string) {
    return url.includes("login") || url.includes("auth/token");
  }
}

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MyRequestInterceptor, multi: true }
  ]
})
export class InterceptorModule { }
