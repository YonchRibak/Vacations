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
import { Title } from "@angular/platform-browser";
import { CountriesService } from "../../../services/countries.service";
import { CountryModel } from "../../../models/CountryModel";
import { CustomStyleDirective } from "../../../directives/custom-style.directive";

@Component({
  selector: "app-payment",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CustomCurrencyPipe,
    CustomStyleDirective,
  ],
  templateUrl: "./payment.component.html",
  styleUrl: "./payment.component.css",
})
export class PaymentComponent implements OnInit {
  public vacation: VacationModel;
  public user: UserModel;
  public subscription: Subscription;
  public _id: string;
  public creditCardValue: string = "";
  public countryInput: string = "";
  public countries: CountryModel[];
  public filteredCountries: CountryModel[];
  public idd: string;

  public constructor(
    private vacationsService: VacationsService,
    private route: ActivatedRoute,
    private title: Title,
    private countriesService: CountriesService
  ) {}

  public async ngOnInit(): Promise<void> {
    this.route.params.subscribe((params) => {
      this._id = params["_id"];
    });
    this.vacation = await this.vacationsService.getVacationById(this._id);
    this.subscription = globalStateManager.currUser$.subscribe((user) => {
      this.user = user;
    });
    this.countries = await this.countriesService.getCountries();
    this.title.setTitle("SoJourn | Payment");
  }

  public formatCardNumber(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.creditCardValue = input.value
      .replaceAll(" ", "")
      .split("")
      .reduce((seed, next, index) => {
        if (index !== 0 && !(index % 4)) seed += " "; // add a space every 4 characters, except at the beginning
        return seed + next; // append current character to result
      }, "");
  }

  public allowOnlyNumbers(event: KeyboardEvent): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      // codes for non-digits characters
      event.preventDefault(); // prevent insertion of character
      return false; // don't allow
    }
    return true;
  }

  public filterCountries(event: Event) {
    const input = (event.target as HTMLInputElement).value;

    if (input.length) {
      this.filteredCountries = this.countries.filter(
        (c) => c.name.common.toLowerCase().startsWith(input) //search-bar functionality
      );
    } else {
      this.filteredCountries = [];
    }
  }

  public selectCountry(country: CountryModel) {
    this.countryInput = country.name.common;
    this.idd = country.idd.root + country.idd.suffixes[0];
    this.filteredCountries = [];
  }
}
