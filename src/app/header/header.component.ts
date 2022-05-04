import { Component, OnInit } from '@angular/core';
import {CurrencyService} from "../shared/currency.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loading: boolean = true;

  constructor(public currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.currencyService.fetchCurrency().subscribe((res) => {
      this.loading = false;
      console.log(this.currencyService.currencyObj)
    });
  }

}
