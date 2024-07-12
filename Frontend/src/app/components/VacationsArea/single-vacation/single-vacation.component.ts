import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { VacationModel } from "../../../models/VacationModel";
import { VacationsService } from "../../../services/vacations.service";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CustomStyleDirective } from "../../../directives/custom-style.directive";
import { IsAdminDirective } from "../../../directives/is-admin.directive";
import { UserModel } from "../../../models/UserModel";
import { Subscription } from "rxjs";
import { globalStateManager } from "../../../services/globalState";
import { IconsModule } from "../../../../icons.module";
import { ConfirmationModalService } from "../../../services/confirmation-modal.service";
import { CustomCurrencyPipe } from "../../../custom-pipes/custom-currency.pipe";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-single-vacation",
  standalone: true,
  imports: [
    CommonModule,
    CustomStyleDirective,
    IsAdminDirective,
    IconsModule,
    RouterLink,
    CustomCurrencyPipe,
  ],
  templateUrl: "./single-vacation.component.html",
  styleUrl: "./single-vacation.component.css",
})
export class SingleVacationComponent implements OnInit {
  private _id: string;
  public vacation: VacationModel;
  public user: UserModel;
  public subscription: Subscription;

  public constructor(
    private vacationsService: VacationsService,
    private route: ActivatedRoute,
    private confirmationModalService: ConfirmationModalService,
    private title: Title
  ) {}

  public async ngOnInit(): Promise<void> {
    this.subscription = globalStateManager.currUser$.subscribe((user) => {
      this.user = user;
    });
    this.route.params.subscribe((params) => {
      this._id = params["_id"];
    });
    this.vacation = await this.vacationsService.getVacationById(this._id);
    this.title.setTitle(`SoJourn | ${this.vacation?.destination}`);
  }

  public openModal(vacation: VacationModel): void {
    this.confirmationModalService.openModal(vacation);
  }
}
