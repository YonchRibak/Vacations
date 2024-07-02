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
import { RouterLink, RouterOutlet } from "@angular/router";
import { globalStateManager } from "../../../services/globalState";

@Component({
  selector: "app-vacation-card",
  standalone: true,
  imports: [CommonModule, IconsModule, RouterOutlet, RouterLink],
  templateUrl: "./vacation-card.component.html",
  styleUrl: "./vacation-card.component.css",
})
export class VacationCardComponent implements OnInit {
  @Input()
  public vacation: VacationModel;
  public user: UserModel;
  @Output()
  public vacationAltered: EventEmitter<number> = new EventEmitter<number>();

  public constructor(
    private vacationService: VacationsService,
    public authService: AuthService
  ) {}

  public ngOnInit(): void {
    this.user = globalStateManager.currUser;
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
      !this.authService.user?.roleId && // not an admin
      this.vacation?.likesIds.includes(this.authService.user?._id)
    );
  }

  public async deleteVacation(): Promise<void> {
    await this.vacationService.deleteVacation(this.vacation._id);
    this.vacationAltered.emit(Math.random());
  }
}
