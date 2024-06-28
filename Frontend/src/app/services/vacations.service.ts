import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { VacationModel } from "../models/VacationModel";
import { appConfig } from "../app.config";
import { first, firstValueFrom } from "rxjs";
import { TokenService } from "./token.service";

@Injectable({
  providedIn: "root",
})
export class VacationsService {
  public vacationsHaveBeenUpdated = 1;
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  public async getAllVacations(pages: number): Promise<VacationModel[]> {
    const observable = this.http.get<VacationModel[]>(
      appConfig.vacationsUrl(pages)
    );
    const vacations = await firstValueFrom(observable);
    return vacations;
  }

  public async toggleLike(vacationId: string, userId: string): Promise<void> {
    const observable = this.http.patch<VacationModel>(
      appConfig.vacationUrlStatic + vacationId + "/like",
      { userId: userId }
    );
    await firstValueFrom(observable);
    this.vacationsHaveBeenUpdated++;
  }
}
