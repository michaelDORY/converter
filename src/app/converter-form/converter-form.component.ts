import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ConvertableObj} from "./currency-group/currency-group.component";
import {CurrencyService} from "../shared/currency.service";
import {ConvertPipe} from "../pipes/convert.pipe";

@Component({
  selector: 'app-converter-form',
  templateUrl: './converter-form.component.html',
  styleUrls: ['./converter-form.component.scss'],
  providers: [ConvertPipe]
})
export class ConverterFormComponent implements OnInit, AfterViewInit {
  isArrowReversed = false;
  convertableGroup: ConvertableObj | undefined;
  resultGroup: ConvertableObj | undefined;
  convertedResult: string | undefined;

  constructor(private cdRef: ChangeDetectorRef, private currencyService: CurrencyService, private converterPipe: ConvertPipe) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  reverse() {
    this.isArrowReversed = !this.isArrowReversed;
    const temp = this.convertableGroup;
    this.convertableGroup = this.resultGroup;
    this.resultGroup = temp;
  }

  updateGroups(groupInfo: ConvertableObj) {
    if (groupInfo.isGroupActive) {
      if(groupInfo.indexOfGroup === this.resultGroup?.indexOfGroup) {
        this.reverse();
      }
      this.convertableGroup = groupInfo;
    } else {
      if(groupInfo.indexOfGroup !== this.resultGroup?.indexOfGroup) {
        this.reverse();
      }
      this.resultGroup = groupInfo;
    }
    this.doConvert();
  }

  doConvert() {

    const currency = this.currencyService.currencyArr;
    const fromName = this.convertableGroup?.currencyName;
    const toName = this.resultGroup?.currencyName;

    const from = currency.find((item) => item.ccy === fromName)?.buy;
    const to = currency.find((item) => item.ccy === toName)?.buy;
    const value = this.convertableGroup?.value;

    if(fromName === "UAN" && toName !== "UAN" && value && to) {
      this.convertedResult = value / to + "";
    }
    else if (toName === "UAN" && fromName !== "UAN"  && value && from) {
      this.convertedResult = value * from + "";
    }
    else if (toName === "UAN" && fromName === "UAN" && value && from) {
      this.convertedResult = value + "";
    }
    else {
      if (to && from && value) {
        this.convertedResult = this.converterPipe.transform(+value, +from, +to).toString();
      }
    }
  }
}
