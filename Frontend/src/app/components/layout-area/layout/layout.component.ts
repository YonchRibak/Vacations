import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TokenService } from "../../../services/token.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import { UserModel } from "../../../models/UserModel";
import { VacationsService } from "../../../services/vacations.service";
import { globalStateManager } from "../../../services/globalState";
import { NavbarComponent } from "../navbar/navbar.component";
import { Subscription } from "rxjs";
import { ConfirmationModalComponent } from "../../SharedArea/confirmation-modal/confirmation-modal.component";
import { CustomStyleDirective } from "../../../directives/custom-style.directive";

@Component({
  selector: "app-layout",
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    NavbarComponent,
    ConfirmationModalComponent,
    CustomStyleDirective,
  ],
  templateUrl: "./layout.component.html",
  styleUrl: "./layout.component.css",
})
export class LayoutComponent implements OnInit {
  public user: UserModel;
  public subscription: Subscription;

  public constructor(
    private tokenService: TokenService,
    public authService: AuthService,
    private vacationsService: VacationsService
  ) {}

  public async ngOnInit(): Promise<void> {
    if (this.tokenService.getToken()) {
      await this.vacationsService.getAllVacations("likesCount");
      await this.authService.retrieveUser();
      this.authService.loggedIn.next(true);
      this.subscription = globalStateManager.currUser$.subscribe((user) => {
        this.user = user;
      });
    }
  }
}
