import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CredentialsModel } from "../../../models/CredentialsModel";
import { TokenService } from "../../../services/token.service";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  public credentials = new CredentialsModel();

  public constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  public async send(): Promise<void> {
    const token = await this.authService.login(this.credentials);
    this.router.navigateByUrl("/home");
  }
}
