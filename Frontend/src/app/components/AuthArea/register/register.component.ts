import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { UserModel } from "../../../models/UserModel";
import { AuthService } from "../../../services/auth.service";
import { Router, RouterLink } from "@angular/router";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css",
})
export class RegisterComponent implements OnInit {
  public newUser = new UserModel();
  public passwordWeak: boolean = false;
  public passwordStrong: boolean = false;
  public passwordInvalid: boolean = false;
  public passwordMismatch: boolean = false;
  public confirmPassword: string = "";

  public constructor(
    private authService: AuthService,
    public router: Router,
    private title: Title
  ) {}
  public ngOnInit(): void {
    this.title.setTitle("SoJourn | Register");
  }

  public checkPasswordStrength() {
    const password = this.newUser.password;

    if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      this.passwordInvalid = true;
      this.passwordWeak = false;
      this.passwordStrong = false;
    } else if (password.length >= 8) {
      this.passwordInvalid = false;
      this.passwordWeak = false;
      this.passwordStrong = true;
    } else {
      this.passwordInvalid = false;
      this.passwordWeak = true;
      this.passwordStrong = false;
    }
  }

  public checkPasswordMatch() {
    // Check if password and confirmPassword match
    this.passwordMismatch = this.newUser.password !== this.confirmPassword;
  }
  public async send(): Promise<void> {
    try {
      const token = await this.authService.register(this.newUser);
      this.router.navigateByUrl("/home");
    } catch (err: any) {
      alert(err.message);
    }
  }
}
