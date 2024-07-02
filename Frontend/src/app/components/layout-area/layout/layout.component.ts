import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { TokenService } from "../../../services/token.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import { UserModel } from "../../../models/UserModel";
import { VacationsService } from "../../../services/vacations.service";
import { globalStateManager } from "../../../services/globalState";
import { NavbarComponent } from "../navbar/navbar.component";
import { subscribe } from "valtio";

@Component({
  selector: "app-layout",
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, NavbarComponent],
  templateUrl: "./layout.component.html",
  styleUrl: "./layout.component.css",
})
export class LayoutComponent implements OnInit {
  public constructor(
    private tokenService: TokenService,
    public authService: AuthService,
    private vacationsService: VacationsService
  ) {}
  public user = globalStateManager.currUser;

  public async ngOnInit(): Promise<void> {
    if (this.tokenService.getToken()) {
      this.authService.isLoggedIn = true;
      await this.vacationsService.getAllVacations("likesCount");
      await this.authService.retrieveUser();
      const unsubscribe = subscribe(globalStateManager, () => {
        this.user = globalStateManager.currUser;
      });
    }
  }
}
