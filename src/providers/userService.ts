import { Injectable } from "@angular/core";
import { Api } from "./api";
import { Observable } from "rxjs/Observable";
import { LoginDto } from "../models/loginDto";
import { TokensResponseDto } from "../models/tokensResponseDto";
import { tap } from "rxjs/operators";
import { Storage } from '@ionic/storage';

@Injectable()
export class UserService {
  isLoggedIn: boolean;

  constructor() {}
}
