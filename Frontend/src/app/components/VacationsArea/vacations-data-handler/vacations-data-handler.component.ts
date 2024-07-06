import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { UserModel } from "../../../models/UserModel";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-vacations-data-handler",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./vacations-data-handler.component.html",
  styleUrl: "./vacations-data-handler.component.css",
})
export class VacationsDataHandlerComponent {
  @Input() public sortBy: string;
  @Input() public filterBy: string;
  public searchValue: string;
  @Input() public user: UserModel;

  @Output() public sortChange = new EventEmitter<string>();
  @Output() public filterChange = new EventEmitter<string>();
  @Output() public searchChange = new EventEmitter<string>();

  public sort(): void {
    this.sortChange.emit(this.sortBy);
  }

  public toggleFilter(value: string): void {
    if (this.filterBy === value) {
      this.filterBy = "noFilter";
    } else {
      this.filterBy = value;
    }
    this.filterChange.emit(this.filterBy);
  }

  public search(): void {
    this.searchChange.emit(this.searchValue);
  }
}
