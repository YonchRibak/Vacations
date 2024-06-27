import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { UserModel } from "../../../models/UserModel";
import { AuthService } from "../../../services/auth.service";
import { TokenService } from "../../../services/token.service";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css",
})
export class RegisterComponent {
  public newUser = new UserModel();
  public passwordWeak: boolean = false;
  public passwordStrong: boolean = false;
  public passwordInvalid: boolean = false;
  public passwordMismatch: boolean = false;
  public confirmPassword: string = "";

  public constructor(
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

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
        localStorage.setItem("token", token)
        this.tokenService.setToken(token);
    } catch (err: any) {
      alert(err.message);
    }
  }
}
