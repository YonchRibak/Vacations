import {
  Directive,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from "@angular/core";

@Directive({
  selector: "[isLaptop]",
  standalone: true,
})
export class IsLaptopDirective implements OnInit, OnDestroy {
  private resizeListener: () => void;

  public constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
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
    if (window.innerWidth >= 935) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
