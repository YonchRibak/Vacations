import {
  Directive,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from "@angular/core";
import { IsMobileService } from "../services/is-mobile.service";

@Directive({
  selector: "[isMobile]",
  standalone: true,
})
export class IsMobileDirective implements OnInit, OnDestroy {
  private resizeListener: () => void;

  public constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private isMobileService: IsMobileService
  ) {}

  public ngOnInit() {
    this.updateView();
    this.resizeListener = this.onResize.bind(this);
    window.addEventListener("resize", this.resizeListener);
  }

  public ngOnDestroy() {
    window.removeEventListener("resize", this.resizeListener);
  }

  private onResize() {
    this.updateView();
  }

  private updateView() {
    this.viewContainer.clear();
    const isMobile = window.innerWidth < 935;
    this.isMobileService.setIsMobile(isMobile);
    if (isMobile) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
