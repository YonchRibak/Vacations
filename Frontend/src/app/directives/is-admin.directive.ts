import {
  Directive,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from "@angular/core";
import { globalStateManager } from "../services/globalState";
import { Subscription } from "rxjs";
import { UserModel } from "../models/UserModel";
import { AuthService } from "../services/auth.service";

@Directive({
  selector: "[isAdmin]",
  standalone: true,
})
export class IsAdminDirective implements OnInit, OnDestroy {
  public adminSubscription: Subscription;
  public loggedInSubscription: Subscription;
  private isLoggedIn: boolean;
  private user: UserModel | undefined;
 
  public constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  public ngOnInit() {
    this.adminSubscription = globalStateManager.currUser$.subscribe((user) => {
      this.user = user;
      this.updateView();
    });
    
    this.loggedInSubscription = this.authService.isLoggedIn$.subscribe(
      (isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
        this.updateView();
      }
    );
  }

  private updateView() {
    this.viewContainer.clear();
    if (this.user?.roleId && this.isLoggedIn) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  public ngOnDestroy() {
    if (this.adminSubscription) {
      this.adminSubscription.unsubscribe();
    }
    if (this.loggedInSubscription) {
      this.loggedInSubscription.unsubscribe();
    }
  }
}
