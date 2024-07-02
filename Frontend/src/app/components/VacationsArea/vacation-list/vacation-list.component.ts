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
import { FormsModule } from "@angular/forms";
import { UserModel } from "../../../models/UserModel";
import { AuthService } from "../../../services/auth.service";
import { globalStateManager } from "../../../services/globalState";
import { subscribe } from "valtio";

@Component({
  selector: "app-vacation-list",
  standalone: true,
  imports: [VacationCardComponent, CommonModule, FormsModule],
  templateUrl: "./vacation-list.component.html",
  styleUrl: "./vacation-list.component.css",
})
export class VacationListComponent implements OnInit {
  public vacations: VacationModel[];
  public currPage: number = 1;
  public sortBy: string = "startDate";
  public filterBy: string;
  public user = globalStateManager.currUser;
  private unsubscribe: () => void;

  public constructor(
    public vacationsService: VacationsService,
    public authService: AuthService
  ) {}

  public async ngOnInit(): Promise<void> {
    await this.fetchVacations();
    this.unsubscribe = subscribe(globalStateManager, () => {
      this.user = globalStateManager.currUser;
    });
  }

  public async fetchVacations() {
    try {
      this.vacations = await this.vacationsService.getAllVacationsWithLimit(
        this.currPage,
        this.sortBy,
        this.filterBy
      );

      if (!this.vacations?.length) await this.backwards(); // in case currently in a page with no vacations, go back.
    } catch (err: any) {
      alert(err.message);
    }
  }

  public async receivedChangeFromChild(toggled: number) {
    await this.fetchVacations();
  }

  public async forwards(): Promise<void> {
    this.currPage++;
    await this.fetchVacations();
  }

  public async backwards(): Promise<void> {
    this.currPage--;
    await this.fetchVacations();
  }

  public trackByFn(index: number, item: VacationModel) {
    return item._id;
  }

  public async sort(): Promise<void> {
    this.currPage = 1;
    await this.fetchVacations();
  }

  public async toggleFilter(value: string): Promise<void> {
    if (this.filterBy === value) {
      this.filterBy = null;
    } else {
      this.filterBy = value;
    }
    this.currPage = 1;
    await this.fetchVacations();
  }
}
