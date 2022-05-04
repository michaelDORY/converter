import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ConverterFormComponent } from './converter-form/converter-form.component';
import { CurrencyGroupComponent } from "./converter-form/currency-group/currency-group.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {ConvertPipe} from "./pipes/convert.pipe";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ConverterFormComponent,
    CurrencyGroupComponent,
    ConvertPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
