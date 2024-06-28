import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { TokenService } from "../../../services/token.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import { UserModel } from "../../../models/UserModel";

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
    public authService: AuthService
  ) {}

  public async ngOnInit(): Promise<void> {
    if (this.tokenService.getToken()) {
      this.authService.isLoggedIn = true;
      this.authService.user = await this.authService.retrieveUser();
    }
  }

  public logout() {
    localStorage.removeItem("token");
    this.tokenService.setToken("");
    this.authService.isLoggedIn = false;
  }
}
