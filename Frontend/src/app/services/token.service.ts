import { Injectable } from "@angular/core";
import { UserModel } from "../models/UserModel";

@Injectable({
  providedIn: "root",
})
export class TokenService {
  private authToken: string = "";

  public constructor() {}

  public setToken(token: string) {
    this.authToken = token;
  }

  public getToken(): string {
    if (localStorage.getItem("token")) {
      this.authToken = localStorage.getItem("token");
    }
    return this.authToken;
  }
}
