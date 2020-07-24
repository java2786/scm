import { NgModule } from '@angular/core';

import { StockMarketRoutingModule } from './stock-market-routing.module';
import { StockDataComponent } from './components/stock-data/stock-data.component';
import { CompanyComponent } from './components/company/company.component';
import { StockPriceComponent } from './components/stock-price/stock-price.component';
import { StockIndicesComponent } from './components/stock-indices/stock-indices.component';
import { ComparisionsComponent } from './components/comparisions/comparisions.component';
import { HttpClientModule } from '@angular/common/http';
// import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ExcelUploaderComponent } from './components/excel-uploader/excel-uploader.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [StockDataComponent, CompanyComponent, StockPriceComponent, StockIndicesComponent, ComparisionsComponent, ExcelUploaderComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    // BrowserModule,
    FormsModule,
    ReactiveFormsModule,

    StockMarketRoutingModule,
    ChartsModule
  ],
  exports: [
    HttpClientModule,
    // BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StockMarketModule { }
