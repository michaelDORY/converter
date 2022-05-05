import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, tap, catchError, throwError} from "rxjs";

interface Currency {
  ccy: string,
  base_ccy: string,
  buy: number,
  sale: number
}

interface CurrencyObj {
  [key: string]: Currency
}

@Injectable({providedIn: 'root'})

export class CurrencyService {

  currencyArr: Currency[] = [];
  currencyObj: CurrencyObj = {};

  constructor(private http: HttpClient) {
  }

  fetchCurrency(): Observable<Currency[]> {
    return this.http.get<Currency[]>("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5")
      .pipe(
        tap((response) => {
        this.currencyArr = response;
        this.currencyObj = response.reduce((acc: CurrencyObj, item) => {
          const fixedItem = {...item};
          fixedItem.buy = this.shortNumber(fixedItem.buy, 3);
          fixedItem.sale = this.shortNumber(fixedItem.sale, 3);
          acc[item.ccy] = fixedItem;
          return acc;
        }, {})
      }), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError("Server Error");
  }

  shortNumber(number: number, digitsAfterDot: number): number {
    // return Math.round(number);
    return parseFloat(Number(number).toFixed(digitsAfterDot));
  }
}
