import { Component, OnInit, HostListener } from "@angular/core";
import { AgCharts } from "ag-charts-angular";
import { AgChartOptions } from "ag-charts-community";
import { VacationsService } from "../../../services/vacations.service";
import { globalStateManager } from "../../../services/globalState";
import { CsvService } from "../../../services/csv.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-report",
  standalone: true,
  imports: [AgCharts],
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.css"],
})
export class ReportComponent implements OnInit {
  public chartOptions: AgChartOptions;

  public constructor(
    public vacationsService: VacationsService,
    public csvService: CsvService,
    public title: Title
  ) {
    this.chartOptions = {
      data: globalStateManager.vacations,
      title: {
        text: "Vacation Popularity Report",
      },
      tooltip: {
        delay: 100,
        class: "report-tooltip",
      },
      axes: [
        {
          type: "category",
          position: "bottom",
          label: {
            fontSize: 10,
            rotation: 90,
          },
        },
        {
          type: "number",
          position: "left",
        },
      ],
      series: [
        {
          highlightStyle: {
            item: {
              fill: "green",
            },
          },
          type: "bar",
          xKey: "destination",
          yKey: "likesCount",
          cornerRadius: 10,
        },
      ],
      width: this.computeWidth(),
      height: this.computeHeight(),
    };
  }

  public async ngOnInit(): Promise<void> {
    if (!globalStateManager.vacations.length)
      await this.vacationsService.getAllVacations("likesCount");
    this.title.setTitle("SoJourn | Reports");
    // Recompute chart dimensions on window resize
    this.updateChartSize();
  }

  @HostListener("window:resize", ["$event"])
  onResize(event: UIEvent) {
    this.updateChartSize();
  }

  private updateChartSize(): void {
    this.chartOptions.width = this.computeWidth();
    this.chartOptions.height = this.computeHeight();
  }

  private computeWidth(): number {
    return Math.round(window.innerWidth * 0.85);
  }

  private computeHeight(): number {
    return Math.round(window.innerHeight * 0.4);
  }

  downloadCSV() {
    this.csvService.downloadCSV(globalStateManager.vacations, "vacations.csv");
  }
}
