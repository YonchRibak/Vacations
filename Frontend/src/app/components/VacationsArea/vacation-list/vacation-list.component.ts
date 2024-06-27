import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { VacationCardComponent } from "../vacation-card/vacation-card.component";
import { CommonModule } from "@angular/common";
import { VacationsService } from "../../../services/vacations.service";
import { VacationModel } from "../../../models/VacationModel";

@Component({
  selector: "app-vacation-list",
  standalone: true,
  imports: [VacationCardComponent, CommonModule],
  templateUrl: "./vacation-list.component.html",
  styleUrl: "./vacation-list.component.css",
})
export class VacationListComponent implements OnInit, OnChanges {
  public vacations: VacationModel[];
  public currPage: number = 1;
  public childToggled: boolean = false;

  public async receivedChangeFromChild(state: boolean) {
    this.childToggled = state;
    try {
      this.vacations = await this.vacationsService.getAllVacations(
        this.currPage
      );
    } catch (err: any) {
      alert(err.message);
    }
  }

  public constructor(public vacationsService: VacationsService) {}

  public async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes["childToggled"]) {
      try {
        this.vacations = await this.vacationsService.getAllVacations(
          this.currPage
        );
      } catch (err: any) {
        alert(err.message);
      }
    }
  }

  public async ngOnInit(): Promise<void> {
    try {
      this.vacations = await this.vacationsService.getAllVacations(
        this.currPage
      );
    } catch (err: any) {
      alert(err.message);
    }
  }

  public async forwards(): Promise<void> {
    this.currPage++;
    this.vacations = await this.vacationsService.getAllVacations(this.currPage);
  }

  public async backwards(): Promise<void> {
    this.currPage--;
    this.vacations = await this.vacationsService.getAllVacations(this.currPage);
  }
}
