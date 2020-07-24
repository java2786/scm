// import { Component, OnInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { StockPriceService } from '../../services/stock-price.service';

@Component({
  selector: 'app-comparisions',
  templateUrl: './comparisions.component.html',
  styleUrls: ['./comparisions.component.scss']
})
export class ComparisionsComponent implements OnInit {

  stockPrices: any[] = [];
  companyCodes: string[] = [];
  selectedCompany: string = null;

  line: any = {
    lineChartData: [
      { data: [], label: 'Price' },
    ],
    lineChartLabels: [],
    lineChartType: 'line'
  }

  bar: any = {
    labels: [],
    type: 'bar',
    data: [
      { data: [], label: '' }
    ]    
  }

  colors:any[]= [
    { backgroundColor:'#FF7360' },
    { backgroundColor:'#6FC8Ce' },
    { backgroundColor:"darkseagreen" },
    { backgroundColor:"cornflowerblue" }

  ]

  constructor(private stockPriceService: StockPriceService) { }

  ngOnInit() {

    this.stockPriceService.getAllStockPrices()
      .subscribe((res: any) => {
        console.log(res);
        this.stockPrices = res;
        this.companyCodes = Array.from(new Set(res.map((stock: any) => stock.companyCode)));

        this.findBarChartData();
      }, err => {
        console.log(err);
      })

  }

  onChangeCompany(company) {
    this.selectedCompany = company;
    this.findLineChartData();
  }

  findLineChartData() {
    let selectedStocks = this.stockPrices.filter(stock => {
      return stock.companyCode == this.selectedCompany;
    });

    this.line.lineChartData[0].data = selectedStocks.map(stock => stock.currentPrice);
    this.line.lineChartLabels = selectedStocks.map(stock => stock.date);

  }

  findBarChartData() {
    for (var i = 0; i < this.companyCodes.length; i++) {
      if (!this.bar.data[i]) { this.bar.data.push({}); }
      this.bar.data[i].label = this.companyCodes[i];
      this.bar.data[i].data = this.stockPrices.filter(stock => {
        return stock.companyCode == this.companyCodes[i];
      }).map(stock => +stock.currentPrice);
      this.bar.data[i].backgroundColor = this.colors[i].backgroundColor;


      this.bar.labels = this.stockPrices.filter(stock => {
        return stock.companyCode == this.companyCodes[i];
      }).map(stock => stock.date);

    }
  }

}
