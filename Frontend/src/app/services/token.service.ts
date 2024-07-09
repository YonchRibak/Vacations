import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TokenService {
  private authToken: string = "";

  public constructor() {}

  public setToken(token: string) {
    localStorage.setItem("token", token);
    this.authToken = token;
  }

  public getToken(): string {
    if (localStorage.getItem("token")) {
      this.authToken = localStorage.getItem("token");
    }
    return this.authToken;
  }
}
