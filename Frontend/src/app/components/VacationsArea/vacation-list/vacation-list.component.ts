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
import { AuthService } from "../../../services/auth.service";
import { globalStateManager } from "../../../services/globalState";
import { subscribe } from "valtio";
import {
  trigger,
  transition,
  query,
  stagger,
  animate,
  animateChild,
  style,
} from "@angular/animations";
import { VacationsDataHandlerComponent } from "../vacations-data-handler/vacations-data-handler.component";

@Component({
  selector: "app-vacation-list",
  standalone: true,
  imports: [
    VacationCardComponent,
    CommonModule,
    FormsModule,
    VacationsDataHandlerComponent,
  ],
  templateUrl: "./vacation-list.component.html",
  styleUrl: "./vacation-list.component.css",
  animations: [
    trigger("listAnimation", [
      transition("* => *", [
        query("@fadeIn", stagger(100, animateChild()), { optional: true }),
      ]),
    ]),
    trigger("leave", [
      transition(":leave", [
        style({ opacity: 1 }),
        animate("250ms", style({ opacity: 0, transform: "translateX(10px)" })),
      ]),
    ]),
  ],
})
export class VacationListComponent implements OnInit {
  public vacations: VacationModel[];
  public currPage: number = 1;
  public key: number = 0;
  public sortBy: string = "startDate";
  public filterBy: string;
  public searchValue: string;
  public user = globalStateManager.currUser;
  public unsubscribe: () => void;

  public constructor(
    public vacationsService: VacationsService,
    public authService: AuthService
  ) {}

  public async ngOnInit(): Promise<void> {
    this.unsubscribe = subscribe(globalStateManager, () => {
      this.user = globalStateManager.currUser;
    });
    await this.fetchVacations();
  }

  public async fetchVacations() {
    try {
      this.vacations = await this.vacationsService.getAllVacationsWithLimit(
        this.currPage,
        this.sortBy,
        this.filterBy,
        this.searchValue
      );
      this.key++;

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

  public async sort(sortBy: string): Promise<void> {
    this.sortBy = sortBy;
    this.currPage = 1;
    await this.fetchVacations();
  }

  public async toggleFilter(filterBy: string): Promise<void> {
    this.filterBy = filterBy;
    this.currPage = 1;
    await this.fetchVacations();
  }
  public async search(searchValue: string): Promise<void> {
    this.searchValue = searchValue;
    this.currPage = 1;
    await this.fetchVacations();
  }
}
