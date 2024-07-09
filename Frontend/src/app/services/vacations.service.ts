import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { VacationModel } from "../models/VacationModel";
import { appConfig } from "../app.config";
import { firstValueFrom } from "rxjs";
import { globalStateManager } from "./globalState";

@Injectable({
  providedIn: "root",
})
export class VacationsService {
  constructor(private http: HttpClient) {}

  public async getAllVacationsWithLimit(
    pages: number,
    sortBy: string = "startDate",
    filterBy: string = "noFilter",
    searchValue?: string
  ): Promise<VacationModel[]> {
    const observable = this.http.get<VacationModel[]>(
      appConfig.vacationsUrl(pages, sortBy, filterBy, searchValue)
    );
    const vacations = await firstValueFrom(observable);
    return vacations;
  }

  public async getAllVacations(
    sortBy: string = "startDate",
    filterBy: string = "noFilter"
  ): Promise<void> {
    const oneHour = 60 * 60 * 1000; // One hour in milliseconds

    const storedVacations = localStorage.getItem("vacations");
    let shouldRefetch = true;

    if (storedVacations) {
      const parsedVacations = JSON.parse(storedVacations);
      const storedTimeStamp = new Date(parsedVacations.timeStamp).getTime();
      const currentTime = new Date().getTime();

      // Check if one hour has passed since the item was stored
      if (currentTime - storedTimeStamp < oneHour) {
        shouldRefetch = false;
      }
    }

    if (shouldRefetch) {
      const observable = this.http.get<VacationModel[]>(
        appConfig.vacationUrlStatic + `${sortBy}/${filterBy}`
      );
      const vacations = await firstValueFrom(observable);
      localStorage.setItem(
        "vacations",
        JSON.stringify({ value: vacations, timeStamp: new Date() })
      );
    }

    globalStateManager.vacations = JSON.parse(
      localStorage.getItem("vacations")
    ).value;
  }

  public async getVacationById(_id: string): Promise<VacationModel> {
    const observable = this.http.get<VacationModel>(
      appConfig.vacationUrlStatic + _id
    );
    const vacation = await firstValueFrom(observable);
    return vacation;
  }

  public async toggleLike(vacationId: string, userId: string): Promise<void> {
    const observable = this.http.patch<VacationModel>(
      appConfig.vacationUrlStatic + vacationId + "/like",
      { userId: userId }
    );
    await firstValueFrom(observable);
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

  public async editVacation(
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

    const observable = this.http.put(
      appConfig.vacationUrlStatic + vacation._id,
      formData
    );
    const updatedVacation = await firstValueFrom(observable);
    return updatedVacation as VacationModel;
  }
}
