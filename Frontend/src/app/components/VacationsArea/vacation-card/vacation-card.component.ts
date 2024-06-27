import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { VacationModel } from "../../../models/VacationModel";

@Component({
  selector: "app-vacation-card",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./vacation-card.component.html",
  styleUrl: "./vacation-card.component.css",
})
export class VacationCardComponent {
    @Input()
    public vacation: VacationModel;

    
}
