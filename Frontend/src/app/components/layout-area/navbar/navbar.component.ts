import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, HostListener, OnInit } from "@angular/core";
import { UserModel } from "../../../models/UserModel";
import { AuthService } from "../../../services/auth.service";
import { globalStateManager } from "../../../services/globalState";
import { TokenService } from "../../../services/token.service";
import { Router, RouterLink, RouterModule } from "@angular/router";
import { subscribe } from "valtio";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  public user = globalStateManager.currUser;
  public navbarOpen = false;
  public clicked = false;
  public _el: any;
  public unsubscribe: () => void;
  public toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  constructor(
    public authService: AuthService,
    public tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.unsubscribe = subscribe(globalStateManager, () => {
      this.user = globalStateManager.currUser;
    });
  }
  ngAfterViewInit() {
    document.addEventListener("click", this.clickedOutside.bind(this));
  }

  onClick(event: MouseEvent): void {
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
    localStorage.removeItem("token");
    this.tokenService.setToken("");
    this.authService.isLoggedIn = false;
    this.user = null;
    this.router.navigateByUrl("/login");
  }
}
