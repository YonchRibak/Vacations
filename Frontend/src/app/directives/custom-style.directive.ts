import {
  Directive,
  Input,
  Renderer2,
  ElementRef,
  OnDestroy,
  OnInit,
} from "@angular/core";

@Directive({
  selector: "[customStyle]",
  standalone: true,
})
export class CustomStyleDirective implements OnInit, OnDestroy {
  @Input("mobileStyle") mobileStyle: { [key: string]: string };
  @Input("laptopStyle") laptopStyle: { [key: string]: string };

  private resizeListener: () => void;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.updateStyles();
    this.resizeListener = this.onResize.bind(this);
    window.addEventListener("resize", this.resizeListener);
  }

  ngOnDestroy() {
    window.removeEventListener("resize", this.resizeListener);
  }

  private onResize() {
    this.updateStyles();
  }

  private updateStyles() {
    const styles =
      window.innerWidth < 935 ? this.mobileStyle : this.laptopStyle;
    this.applyStyles(styles);
  }

  private applyStyles(styles: { [key: string]: string }) {
    if (!styles) return;

    Object.keys(styles).forEach((style) => {
      this.renderer.setStyle(this.el.nativeElement, style, styles[style]);
    });
  }
}
