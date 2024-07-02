import { Component, OnInit } from "@angular/core";
import { AgCharts } from "ag-charts-angular";
import { AgChartOptions } from "ag-charts-community";
import { VacationModel } from "../../../models/VacationModel";
import { VacationsService } from "../../../services/vacations.service";
import { globalStateManager } from "../../../services/globalState";

@Component({
  selector: "app-report",
  standalone: true,
  imports: [AgCharts],
  template: `<ag-charts style="height: 100%" [options]="chartOptions">
  </ag-charts>`,
  templateUrl: "./report.component.html",
  styleUrl: "./report.component.css",
})
export class ReportComponent {
  public vacations: VacationModel[];
  public chartOptions: AgChartOptions;

  public constructor(public vacationsService: VacationsService) {
    this.chartOptions = {
      data: globalStateManager.vacations,
      series: [
        {
          type: "bar",
          xKey: "destination",
          yKey: "likesCount",
        },
      ],
    };
  }
}
