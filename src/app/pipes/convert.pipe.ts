import { Pipe, PipeTransform } from '@angular/core';
import {CurrencyService} from "../shared/currency.service";
@Pipe({
  name: 'convert'
})
export class ConvertPipe implements PipeTransform {
  constructor(private currencyService: CurrencyService) {
  }
  transform(value: number, from: string, to: string): number {
    console.log("res")
    const arr = this.currencyService.currencyArr;
    const toBuy = arr.find(item => item.ccy === to)?.buy;
    const fromBuy = arr.find(item => item.ccy === from)?.buy;
    const isToUAH: boolean = to === "UAH";
    const isFromUAH: boolean = from === "UAH";
    let result;

    if(isFromUAH && !isToUAH && toBuy) {
      result = value / toBuy;
    }
    else if(isToUAH && !isFromUAH && fromBuy) {
      result = value * fromBuy;
    }
    else if(isToUAH && isFromUAH) {
      result = value;
    }
    else if(toBuy && fromBuy) {
      result = Number(Number(toBuy / fromBuy * value).toFixed(3));
    }
    else {
      result = 0;
    }

    return +Number(result).toFixed(3);
  }
}
