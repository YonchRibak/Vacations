import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { TokenService } from "../../../services/token.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";

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

  public ngOnInit(): void {
    if (localStorage.getItem("token")) {
      this.tokenService.setToken(localStorage.getItem("token"));
    }
  }

  public logout() {
    localStorage.removeItem("token");
    this.tokenService.setToken("");
    this.authService.isLoggedIn = false;
  }
}
