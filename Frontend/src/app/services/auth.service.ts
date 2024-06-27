import { Injectable } from "@angular/core";
import { UserModel } from "../models/UserModel";
import { HttpClient } from "@angular/common/http";
import { appConfig } from "../app.config";
import { firstValueFrom } from "rxjs";
import { CredentialsModel } from "../models/CredentialsModel";
import { trigger } from "@angular/animations";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public isLoggedIn: boolean = false;
  public user: UserModel;
  constructor(private http: HttpClient) {}

  public async register(user: UserModel): Promise<string> {
    let token: string;
    try {
      const observable = this.http.post<any>(appConfig.registerUrl, user);
      token = await firstValueFrom(observable);
      if (token.length) this.isLoggedIn = true;
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
    } catch (err: any) {
      alert(err.message);
    }
    return token;
  }

  public async retrieveUser(token: string): Promise<UserModel> {
    const observable = this.http.post<UserModel>(appConfig.usersUrl + "me", {
      token: token,
    });
    const user = await firstValueFrom(observable);

    return user;
  }
}
