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

@Component({
  selector: "app-vacation-card",
  standalone: true,
  imports: [
    CommonModule,
    IconsModule,
    RouterOutlet,
    RouterLink,
    IsAdminDirective,
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

  public constructor(private vacationService: VacationsService) {}

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

  public async deleteVacation(): Promise<void> {
    await this.vacationService.deleteVacation(this.vacation._id);
    this.vacationAltered.emit(Math.random());
  }
}
