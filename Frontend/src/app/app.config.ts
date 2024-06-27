import { provideHttpClient } from "@angular/common/http";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";

export const appConfig = {
  providers: [provideRouter(routes), provideHttpClient()],

  registerUrl: "http://localhost:4000/api/register",
  vacationsUrl(page: number = 1): string {
    return `http://localhost:4000/api/vacations?page=${page}&limit=9`;
  },
  loginUrl: "http://localhost:4000/api/login/",
  usersUrl: "http://localhost:4000/api/users/",
};
