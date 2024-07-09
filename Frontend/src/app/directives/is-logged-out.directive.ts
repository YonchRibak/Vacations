import { Directive, TemplateRef, ViewContainerRef } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../services/auth.service";

@Directive({
  selector: "[isLoggedOut]",
  standalone: true,
})
export class IsLoggedOutDirective {
  private subscription: Subscription;

  public constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  public ngOnInit(): void {
    this.subscription = this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.viewContainer.clear();
      if (!isLoggedIn) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
