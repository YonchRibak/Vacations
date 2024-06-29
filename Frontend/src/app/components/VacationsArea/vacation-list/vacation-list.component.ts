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
  public constructor(
    public vacationsService: VacationsService,
    public authService: AuthService
  ) {}

  public async ngOnInit(): Promise<void> {
    await this.fetchVacations();
  }

  public async fetchVacations() {
    try {
      this.vacations = await this.vacationsService.getAllVacations(
        this.currPage,
        this.sortBy,
        this.filterBy
      );
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

  public async toggleFilter(value: string) {
    if (this.filterBy === value) {
      this.filterBy = null;
    } else {
      this.filterBy = value;
    }
    await this.fetchVacations();
  }
}
