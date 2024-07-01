import { CommonModule } from "@angular/common";
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { VacationModel } from "../../../models/VacationModel";
import { IconsModule } from "../../../../icons.module";
import { VacationsService } from "../../../services/vacations.service";
import { AuthService } from "../../../services/auth.service";
import { UserModel } from "../../../models/UserModel";

@Component({
  selector: "app-vacation-card",
  standalone: true,
  imports: [CommonModule, IconsModule],
  templateUrl: "./vacation-card.component.html",
  styleUrl: "./vacation-card.component.css",
})
export class VacationCardComponent {
  @Input()
  public vacation: VacationModel;

  @Output()
  public vacationAltered: EventEmitter<number> = new EventEmitter<number>();

  public constructor(
    private vacationService: VacationsService,
    public authService: AuthService
  ) {
    console.log("isLiked:", this.isLiked());
    console.log("RoleId:", this.authService.user?.roleId === 1);
  }

  public async toggle() {
    await this.vacationService.toggleLike(
      this.vacation?._id,
      this.authService.user._id
    );

    this.vacationAltered.emit(Math.random());
  }

  public isLiked(): boolean {
    return (
      !this.authService.user.roleId && // not an admin
      this.vacation?.likesIds.includes(this.authService.user._id)
    );
  }

  public async deleteVacation(): Promise<void> {
    await this.vacationService.deleteVacation(this.vacation._id);
    this.vacationAltered.emit(Math.random());
  }
}
