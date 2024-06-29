import { provideHttpClient } from "@angular/common/http";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { importProvidersFrom } from "@angular/core";
import { HttpInterceptorModule } from "../http-interceptor.module";
import { filter } from "rxjs";

export const appConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(HttpInterceptorModule),
  ],

  registerUrl: "http://localhost:4000/api/register",
  vacationsUrl(
    page: number = 1,
    sortBy: string = "startDate",
    filterBy: string = "noFilter"
  ): string {
    return `http://localhost:4000/api/vacations/${sortBy}/${filterBy}?page=${page}&limit=9`;
  },
  vacationUrlStatic: "http://localhost:4000/api/vacations/",
  loginUrl: "http://localhost:4000/api/login/",
  usersUrl: "http://localhost:4000/api/users/",
};
