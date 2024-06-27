import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { VacationModel } from "../models/VacationModel";
import { appConfig } from "../app.config";
import { first, firstValueFrom } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class VacationsService {
  constructor(private http: HttpClient) {}

  public async getAllVacations(pages: number): Promise<VacationModel[]> {
    const observable = this.http.get<VacationModel[]>(
      appConfig.vacationsUrl(pages)
    );
    const vacations = await firstValueFrom(observable);
    return vacations;
  }
}
