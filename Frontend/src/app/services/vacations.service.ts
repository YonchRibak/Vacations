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

  public async getAllVacations(
    pages: number,
    sortBy: string = "startDate",
    filterBy: string = "noFilter"
  ): Promise<VacationModel[]> {
    const observable = this.http.get<VacationModel[]>(
      appConfig.vacationsUrl(pages, sortBy, filterBy)
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

  public async addVacation(
    vacation: VacationModel,
    image: File
  ): Promise<VacationModel> {
    const formData = new FormData();
    formData.append("destination", vacation.destination);
    formData.append("description", vacation.description);
    formData.append("startDate", vacation.startDate.toString());
    formData.append("endDate", vacation.endDate.toString());
    formData.append("price", vacation.price.toString());
    formData.append("image", image);

    const observable = this.http.post(appConfig.vacationUrlStatic, formData);
    const addedVacation = await firstValueFrom(observable);
    return addedVacation as VacationModel;
  }

  public async deleteVacation(_id: string): Promise<VacationModel> {
    const observable = this.http.delete(appConfig.vacationUrlStatic, {
      body: { _id: _id },
    });
    const deletedVacation = await firstValueFrom(observable);
    return deletedVacation as VacationModel;
  }
}
