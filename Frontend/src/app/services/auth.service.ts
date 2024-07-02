import { Injectable, OnInit } from "@angular/core";
import { UserModel } from "../models/UserModel";
import { HttpClient } from "@angular/common/http";
import { appConfig } from "../app.config";
import { firstValueFrom } from "rxjs";
import { CredentialsModel } from "../models/CredentialsModel";
import { trigger } from "@angular/animations";
import { TokenService } from "./token.service";
import { globalStateManager } from "./globalState";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public isLoggedIn: boolean = false;
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  public async register(user: UserModel): Promise<string> {
    let token: string;
    try {
      const observable = this.http.post<any>(appConfig.registerUrl, user);
      token = await firstValueFrom(observable);
      if (token.length) this.isLoggedIn = true;
      this.tokenService.setToken(token);
      await this.retrieveUser();
    } catch (err: any) {
      this.isLoggedIn = false;
      alert(err.message);
    }
    return token;
  }

  public async login(credentials: CredentialsModel): Promise<string> {
    let token: string;
    try {
      const observable = this.http.post<any>(appConfig.loginUrl, credentials);
      token = await firstValueFrom(observable);
      if (token.length) this.isLoggedIn = true;
      this.tokenService.setToken(token);
      await this.retrieveUser();
    } catch (err: any) {
      alert(err.message);
    }
    return token;
  }

  public async retrieveUser(): Promise<UserModel> {
    const token = this.tokenService.getToken();
    const observable = this.http.post<UserModel>(appConfig.usersUrl + "me", {
      token: token,
    });
    const user = await firstValueFrom(observable);
    globalStateManager.currUser = user;
    return user;
  }
}
