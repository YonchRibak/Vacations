import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { UserModel } from "../../../models/UserModel";
import { FormsModule } from "@angular/forms";
import { IconsModule } from "../../../../icons.module";
import { IsMobileDirective } from "../../../directives/is-mobile.directive";
import { CustomStyleDirective } from "../../../directives/custom-style.directive";
import { IsLaptopDirective } from "../../../directives/is-laptop.directive";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { ConfirmationModalService } from "../../../services/confirmation-modal.service";

@Component({
  selector: "app-vacations-data-handler",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IconsModule,
    IsMobileDirective,
    IsLaptopDirective,
    CustomStyleDirective,
  ],
  templateUrl: "./vacations-data-handler.component.html",
  styleUrl: "./vacations-data-handler.component.css",
  animations: [
    trigger("toggleAnimation", [
      state(
        "open",
        style({
          height: "*",
          opacity: 1,
        })
      ),
      state(
        "closed",
        style({
          height: "0",
          opacity: 0,
        })
      ),
      transition("open <=> closed", [animate("300ms ease-in-out")]),
    ]),
  ],
})

export class VacationsDataHandlerComponent implements OnInit {
  @Input() public sortBy: string;
  @Input() public filterBy: string;
  public searchValue: string;
  @Input() public user: UserModel;
  public dataHandlerOpen: boolean = false;
  public toggleHandler(): void {
    this.dataHandlerOpen = !this.dataHandlerOpen;
  }
  @Output() public sortChange = new EventEmitter<string>();
  @Output() public filterChange = new EventEmitter<string>();
  @Output() public searchChange = new EventEmitter<string>();

  public constructor(
    private confirmationModalService: ConfirmationModalService
  ) {}

  public ngOnInit(): void {
    this.confirmationModalService.deletionConfirmed.subscribe(() => {
      this.searchValue = "";
    });
  }

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
