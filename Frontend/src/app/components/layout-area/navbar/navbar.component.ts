import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, HostListener, OnInit } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { globalStateManager } from "../../../services/globalState";
import { TokenService } from "../../../services/token.service";
import { Router, RouterLink, RouterModule } from "@angular/router";
import { IsAdminDirective } from "../../../directives/is-admin.directive";
import { UserModel } from "../../../models/UserModel";
import { Subscription } from "rxjs";
import { IsLoggedInDirective } from "../../../directives/is-logged-in.directive";
import { IsLoggedOutDirective } from "../../../directives/is-logged-out.directive";
import { CustomStyleDirective } from "../../../directives/custom-style.directive";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterModule,
    IsAdminDirective,
    IsLoggedInDirective,
    IsLoggedOutDirective,
    CustomStyleDirective,
  ],
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  public user: UserModel;
  public navbarOpen = false;
  public clicked = false;
  public _el: any;
  public subscription: Subscription;
  public toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  constructor(
    public authService: AuthService,
    public tokenService: TokenService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.subscription = globalStateManager.currUser$.subscribe((user) => {
      this.user = user;
    });
  }
  public ngAfterViewInit() {
    document.addEventListener("click", this.clickedOutside.bind(this));
  }

  public onClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.clicked = true;
  }

  @HostListener("document:click", ["$event"])
  private clickedOutside(event: MouseEvent): void {
    if (this.clicked) {
      document.querySelector(".dropdown-menu").classList.toggle("show");
      this.clicked = false;
    }
  }

  public logout() {
    this.authService.logout();
    this.user = null;
    this.toggleNavbar();
    this.router.navigateByUrl("/login");
  }
}
