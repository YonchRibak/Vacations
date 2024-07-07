import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "customCurrency",
  standalone: true,
})
export class CustomCurrencyPipe implements PipeTransform {
  transform(
    value: number,
    currencyCode: string = "EUR",
    display: string = "symbol"
  ): string | null {
    if (value === null || value === undefined) return null;

    const options: Intl.NumberFormatOptions = {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    };

    const formattedValue = new Intl.NumberFormat("en-US", options).format(
      value
    );

    return formattedValue.replace(/(\.00$)/, "");
  }
}
