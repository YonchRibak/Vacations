import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
} from "@angular/core";

@Directive({
  selector: "[atScrollDown]",
  standalone: true,
})
export class ScrollDirective implements OnInit {
  @Input("atScrollDown") scrollThreshold: number = 100;
  private scrollHandler: (event: Event) => void;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  public ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement, "opacity", "0");

    // Define the scroll handler
    this.scrollHandler = this.onContainerScroll.bind(this);

    // Attach the scroll event listener to the parent element
    const main = (this.el.nativeElement as HTMLElement)?.parentElement
      .parentElement?.parentElement;
    if (main) {
      main.addEventListener("scroll", this.scrollHandler);
    }
  }

  public onContainerScroll(event: Event) {
    const target = event.target as HTMLElement;

    if (target.scrollTop > this.scrollThreshold) {
      this.renderer.setStyle(this.el.nativeElement, "opacity", "1");
    } else {
      this.renderer.setStyle(this.el.nativeElement, "opacity", "0");
    }
  }
}
