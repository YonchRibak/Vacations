import { Component, OnInit } from "@angular/core";
import { VacationModel } from "../../../models/VacationModel";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CustomCurrencyPipe } from "../../../custom-pipes/custom-currency.pipe";
import { UserModel } from "../../../models/UserModel";
import { Subscription } from "rxjs";
import { globalStateManager } from "../../../services/globalState";
import { VacationsService } from "../../../services/vacations.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-payment",
  standalone: true,
  imports: [CommonModule, FormsModule, CustomCurrencyPipe],
  templateUrl: "./payment.component.html",
  styleUrl: "./payment.component.css",
})
export class PaymentComponent implements OnInit {
  public vacation: VacationModel;
  public user: UserModel;
  public subscription: Subscription;
  public _id: string;
  public creditCardValue: string = "";

  public constructor(
    private vacationsService: VacationsService,
    private route: ActivatedRoute
  ) {}

  public async ngOnInit(): Promise<void> {
    this.route.params.subscribe((params) => {
      this._id = params["_id"];
    });
    this.vacation = await this.vacationsService.getVacationById(this._id);
    this.subscription = globalStateManager.currUser$.subscribe((user) => {
      this.user = user;
    });
  }

  formatCardNumber(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.creditCardValue = input.value
      .replaceAll(" ", "")
      .split("")
      .reduce((seed, next, index) => {
        if (index !== 0 && !(index % 4)) seed += " ";
        return seed + next;
      }, "");
  }

  allowOnlyNumbers(event: KeyboardEvent): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    }
    return true;
  }
}
