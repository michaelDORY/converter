import {Component, OnInit} from '@angular/core';
import {CurrencyService} from "../shared/currency.service";
import {ConvertPipe} from "../pipes/convert.pipe";

interface GroupInfo {
  option: string,
  amount: number,
  isForResult: boolean
}

@Component({
  selector: 'app-converter-form',
  templateUrl: './converter-form.component.html',
  styleUrls: ['./converter-form.component.scss'],
  providers: [ConvertPipe]
})
export class ConverterFormComponent implements OnInit {
  options = ["EUR", "UAH", "USD"];
  loading = true;
  error = false;

  isArrowReversed = false;
  firstGroup: GroupInfo = {
    option: this.options[0],
    amount: 10,
    isForResult: false
  };
  secondGroup: GroupInfo = {
    option: this.options[1],
    amount: 0,
    isForResult: true
  };

  constructor(private currencyService: CurrencyService, private converterPipe: ConvertPipe) {
  }

  ngOnInit(): void {
      this.currencyService.fetchCurrency().subscribe((res) => {
          this.loading = false;
          this.updateResult();
          this.error = false;
      }, () => {
        this.error = true;
        this.loading = false;
      });
  }

  reverse() {
    this.isArrowReversed = !this.isArrowReversed;

    if(this.firstGroup.isForResult) {
      this.firstGroup.isForResult = false;
      this.secondGroup.isForResult = true;
    }
    else {
      this.firstGroup.isForResult = true;
      this.secondGroup.isForResult = false;
    }
  }

  updateResult(): void {
    let resultGroup;
    let convertableGroup;
    if(this.firstGroup.isForResult) {
      resultGroup = this.firstGroup;
      convertableGroup = this.secondGroup;
    }
    else {
      resultGroup = this.secondGroup;
      convertableGroup = this.firstGroup;
    }
    resultGroup.amount = this.converterPipe.transform(convertableGroup.amount, convertableGroup.option, resultGroup.option);
  }

  onChange(event: Event) {
    switch ((<HTMLElement>event.target).getAttribute('name')) {
      case ('firstInput'):
        this.firstGroup.amount = Math.abs(+(<HTMLInputElement>event.target).value);
        this.firstGroup.isForResult = false;
        this.secondGroup.isForResult = true;
        if(this.isArrowReversed) this.isArrowReversed = false;
        break;
      case ('secondInput'):
        this.secondGroup.amount = Math.abs(+(<HTMLInputElement>event.target).value);
        this.secondGroup.isForResult = false;
        this.firstGroup.isForResult = true;
        if(!this.isArrowReversed) this.isArrowReversed = true;
        break;
      case ('firstSelect'):
        this.firstGroup.option = (<HTMLInputElement>event.target).value;
        break;
      case ('secondSelect'):
        this.secondGroup.option = (<HTMLInputElement>event.target).value;
        break;
      default:
        break;
    }
    this.updateResult();
  }
}
