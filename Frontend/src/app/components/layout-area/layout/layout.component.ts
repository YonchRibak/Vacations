import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { TokenService } from "../../../services/token.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import { UserModel } from "../../../models/UserModel";
import { VacationsService } from "../../../services/vacations.service";
import { globalStateManager } from "../../../services/globalState";

@Component({
  selector: "app-layout",
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule],
  templateUrl: "./layout.component.html",
  styleUrl: "./layout.component.css",
})
export class LayoutComponent implements OnInit {
  public constructor(
    private tokenService: TokenService,
    public authService: AuthService,
    private vacationsService: VacationsService
  ) {}
  public user: UserModel;
  public async ngOnInit(): Promise<void> {
    if (this.tokenService.getToken()) {
      this.authService.isLoggedIn = true;
      await this.vacationsService.getAllVacations();
      await this.authService.retrieveUser();
      this.user = globalStateManager.currUser;
    }
  }

  public logout() {
    localStorage.removeItem("token");
    this.tokenService.setToken("");
    this.authService.isLoggedIn = false;
  }
}
