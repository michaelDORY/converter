import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";

interface SelectOption {
  id: number,
  name: string
}

export interface ConvertableObj {
  indexOfGroup: number,
  isGroupActive: boolean,
  currencyName: string,
  value: number,
}

@Component({
  selector: "app-currency-group",
  templateUrl: "currency-group.component.html",
  styleUrls: ['currency-group.component.scss']
})

export class CurrencyGroupComponent implements OnInit {
  @Input() indexOfGroup: number = 0;
  selectOptions: SelectOption[] = [];
  selectedOption: SelectOption = this.selectOptions[0];
  isGroupActive: boolean = false;
  groupInfo: ConvertableObj | undefined;
  @Input() defaultOptionName: string = "EUR";
  @Input() inputValue: string = '';
  @Output() updateGroupInfo = new EventEmitter<ConvertableObj>();

  constructor() {
  }

  ngOnInit(): void {
    this.selectOptions = [
      {id: 1, name: "EUR"},
      {id: 2, name: "UAN"},
      {id: 3, name: "USD"}
    ];
    this.selectedOption = this.selectOptions.find((item) => item.name === this.defaultOptionName) || this.selectOptions[0];
    this.update();
  }

  update() {
    this.groupInfo = {
      indexOfGroup: this.indexOfGroup,
      isGroupActive: this.isGroupActive,
      currencyName: this.selectedOption.name,
      value: +this.inputValue
    };
    console.log('Update', this.groupInfo)
    this.updateGroupInfo.emit(this.groupInfo);
  }
}
