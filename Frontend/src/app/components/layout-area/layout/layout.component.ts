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
export class LayoutComponent implements OnInit, OnChanges {
  public constructor(
    private tokenService: TokenService,
    public authService: AuthService
  ) {}

  public async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes["this.authService.isLoggedOn"]) {
      this.authService.user = await this.authService.retrieveUser();
    }
  }

  public async ngOnInit(): Promise<void> {
    if (localStorage.getItem("token")) {
      this.tokenService.setToken(localStorage.getItem("token"));
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
