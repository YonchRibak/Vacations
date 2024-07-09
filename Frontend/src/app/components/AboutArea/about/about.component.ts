import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { CustomStyleDirective } from "../../../directives/custom-style.directive";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-about",
  standalone: true,
  imports: [CommonModule, CustomStyleDirective],
  templateUrl: "./about.component.html",
  styleUrl: "./about.component.css",
})
export class AboutComponent implements OnInit {
  public constructor(private title: Title) {}

  public ngOnInit(): void {
    this.title.setTitle("SoJourn | About");
  }
}
