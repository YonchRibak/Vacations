import { Injectable } from "@angular/core";
import { UserModel } from "../models/UserModel";
import { HttpClient } from "@angular/common/http";
import { appConfig } from "../app.config";
import { BehaviorSubject, firstValueFrom } from "rxjs";
import { CredentialsModel } from "../models/CredentialsModel";
import { TokenService } from "./token.service";
import { globalStateManager } from "./globalState";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public loggedIn = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.loggedIn.asObservable();

  public get isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private toast: ToastrService
  ) {}

  public async register(user: UserModel): Promise<string> {
    let token: string;
    try {
      const observable = this.http.post<any>(appConfig.registerUrl, user);
      token = await firstValueFrom(observable);
      if (token.length) this.loggedIn.next(true);
      this.tokenService.setToken(token);
      await this.retrieveUser();
      this.toast.success(`Welcome ${user.firstName}!`);
    } catch (err: any) {
      this.loggedIn.next(false);
      this.toast.error(err.error);
    }
    return token;
  }

  public async login(credentials: CredentialsModel): Promise<string> {
    let token: string;
    try {
      const observable = this.http.post<any>(appConfig.loginUrl, credentials);
      token = await firstValueFrom(observable);
      if (token.length) this.loggedIn.next(true);
      this.tokenService.setToken(token);
      await this.retrieveUser();
    } catch (err: any) {
      this.loggedIn.next(false);
      this.toast.error(err.error);
    }
    return token;
  }

  public logout(): void {
    localStorage.removeItem("token");
    this.tokenService.setToken("");
    this.loggedIn.next(false);
  }

  public async retrieveUser(): Promise<UserModel> {
    const token = this.tokenService.getToken();
    if (!token) {
      console.error("No token found");
      return null;
    }

    try {
      const observable = this.http.post<UserModel>(appConfig.usersUrl + "me", {
        token: token,
      });
      const user = await firstValueFrom(observable);
      globalStateManager.currUser$.next(user);
      return user;
    } catch (error) {
      console.error("Error retrieving user:", error);
      return null;
    }
  }
}
