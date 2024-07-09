import { Injectable } from "@angular/core";
import Papa from "papaparse";
import { VacationModel } from "../models/VacationModel";
import saveAs from "file-saver";

@Injectable({
  providedIn: "root",
})
export class CsvService {
  constructor() {}

  public downloadCSV(vacations: VacationModel[], filename: string): void {
    const data = vacations?.map((vac) => ({
      Destination: vac.destination,
      Followers: vac.likesCount,
    }));
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, filename);
  }
}
