import { Injectable } from "@angular/core";
import { CountryModel } from "../models/CountryModel";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CountriesService {
  public constructor(private http: HttpClient) {}

  public async getCountries(): Promise<CountryModel[]> {
    const observable = this.http.get<CountryModel[]>(
      "https://restcountries.com/v3.1/all?fields=name,idd"
    );
    const countries = await firstValueFrom(observable);
    return countries;
  }
}
