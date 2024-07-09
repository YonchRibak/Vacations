import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { VacationModel } from "../../../models/VacationModel";
import { IconsModule } from "../../../../icons.module";
import { VacationsService } from "../../../services/vacations.service";
import { RouterLink, RouterOutlet } from "@angular/router";
import { globalStateManager } from "../../../services/globalState";
import { trigger, style, animate, transition } from "@angular/animations";
import { IsAdminDirective } from "../../../directives/is-admin.directive";
import { UserModel } from "../../../models/UserModel";
import { Subscription } from "rxjs";
import { CustomCurrencyPipe } from "../../../custom-pipes/custom-currency.pipe";
import { CustomStyleDirective } from "../../../directives/custom-style.directive";
import { ConfirmationModalComponent } from "../../SharedArea/confirmation-modal/confirmation-modal.component";
import { ConfirmationModalService } from "../../../services/confirmation-modal.service";

@Component({
  selector: "app-vacation-card",
  standalone: true,
  imports: [
    CommonModule,
    IconsModule,
    RouterOutlet,
    RouterLink,
    IsAdminDirective,
    CustomCurrencyPipe,
    CustomStyleDirective,
    ConfirmationModalComponent,
  ],
  templateUrl: "./vacation-card.component.html",
  styleUrl: "./vacation-card.component.css",
  animations: [
    trigger("fadeIn", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateX(-10px)" }),
        animate("250ms", style({ opacity: 1, transform: "translateX(0px)" })),
      ]),
    ]),
  ],
})
export class VacationCardComponent implements OnInit {
  @Input()
  public vacation: VacationModel;
  public user: UserModel;
  public subscription: Subscription;
  @Output()
  public vacationAltered: EventEmitter<number> = new EventEmitter<number>();
  public openConfirmationModal: boolean = false;

  public constructor(
    private vacationService: VacationsService,
    private confirmationModalService: ConfirmationModalService
  ) {}

  public ngOnInit(): void {
    this.subscription = globalStateManager.currUser$.subscribe((user) => {
      this.user = user;
    });
  }

  public async toggle() {
    await this.vacationService.toggleLike(this.vacation?._id, this.user?._id);

    this.vacationAltered.emit(Math.random());
  }

  public isLiked(): boolean {
    return (
      !this.user?.roleId && // not an admin
      this.vacation?.likesIds.includes(this.user?._id)
    );
  }

  public openModal(vacation: VacationModel): void {
    this.confirmationModalService.openModal(vacation);
  }
}
