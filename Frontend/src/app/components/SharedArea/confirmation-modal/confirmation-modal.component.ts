import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomStyleDirective } from "../../../directives/custom-style.directive";
import { ConfirmationModalService } from "../../../services/confirmation-modal.service";
import { VacationModel } from "../../../models/VacationModel";
import { VacationsService } from "../../../services/vacations.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-confirmation-modal",
  standalone: true,
  imports: [CommonModule, CustomStyleDirective],
  templateUrl: "./confirmation-modal.component.html",
  styleUrl: "./confirmation-modal.component.css",
})
export class ConfirmationModalComponent implements OnInit {
  public vacation: VacationModel;
  public open: boolean = false;

  public constructor(
    private confirmationModalService: ConfirmationModalService,
    private vacationsService: VacationsService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.confirmationModalService.modalData$.subscribe((data) => {
      this.vacation = data;
    });

    this.confirmationModalService.open$.subscribe((isOpen) => {
      this.open = isOpen;
    });
  }

  public async confirm(): Promise<void> {
    await this.vacationsService.deleteVacation(this.vacation._id);
    this.confirmationModalService.confirmDeletion();
    this.router.navigateByUrl("/home");
  }
  public discard(): void {
    this.confirmationModalService.closeModal();
  }
}
