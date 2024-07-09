import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CredentialsModel } from "../../../models/CredentialsModel";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent implements OnInit {
  public credentials = new CredentialsModel();

  public constructor(
    private authService: AuthService,
    private router: Router,
    private title: Title
  ) {}
  public ngOnInit(): void {
    this.title.setTitle("SoJourn | Login");
  }

  public async send(): Promise<void> {
    const token = await this.authService.login(this.credentials);
    this.router.navigateByUrl("/home");
  }
}
