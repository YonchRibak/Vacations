import {
  Directive,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Subscription } from "rxjs";

@Directive({
  selector: "[isLoggedIn]",
  standalone: true,
})
export class IsLoggedInDirective implements OnInit, OnDestroy {
  private subscription: Subscription;
  public constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}
  public ngOnInit(): void {
    this.subscription = this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.viewContainer.clear();
      if (isLoggedIn) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
