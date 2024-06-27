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
  public user: UserModel;

  @Output()
  public likeHasBeenToggled: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  public constructor(
    private vacationService: VacationsService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  public async toggle() {
    this.user = await this.authService.retrieveUser();
    this.vacationService.toggleLike(this.vacation?._id, this.user?._id);
    this.likeHasBeenToggled.emit(true);
  }
}
