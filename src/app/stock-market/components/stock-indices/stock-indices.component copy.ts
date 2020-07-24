import { Component, OnInit } from '@angular/core';
import { StockPriceService } from '../../services/stock-price.service';
import { StockPrice } from '../../models/stock-price.model';

@Component({
  selector: 'app-stock-indices',
  templateUrl: './stock-indices.component.html',
  styleUrls: ['./stock-indices.component.scss']
})
export class StockIndicesComponent implements OnInit {

  companyCodes: string[] = [];
  // selectedCompany: string = "Select company";
  selectedDate_1: string = null;
  selectedDate_2: string = null;
  stockData: any[] = [];
  stockPrices: any[];
  Math:Math = Math;


  outstandingShares: number[] = [1000, 2000, 100000, 5000, 4000, 6200, 6000];
  
  priceWeightingTotal:any = {
    total_1: 0,
    total_2: 0
  }
  equalWeightingData: any = {
    relativeTotal: 0
  };

  valueWeighting: any = {
    total_1: 0,
    total_2: 0
  }

  geometricMean:any = {
    productOfRelativePrices: 1
  }

  stockPriceWeightingData: any[];
  constructor(private stockPriceService: StockPriceService) { }

  ngOnInit() {

    this.stockPriceService.getAllStockPrices()
    .subscribe((res:any)=>{
      console.log(res);
      this.stockPrices = res;
      // this.companyCodes = Array.from(new Set(res.map((stock:any) => stock.companyCode)));
      console.log(this.companyCodes);
    }, err=>{
      console.log(err);
    })

    // this.stockPriceService.getAllStockPrices()
    // .subscribe(res=>{
    //   console.log(res);
    //   this.stockPrices = res;
      // this.stockPrices.map(stockPrice=>{
      //   if(!this.companyNames.includes(stockPrice.companyCode))
      //   this.companyNames.push(stockPrice.companyCode);
      // })
      // console.log(this.companyNames)
    // }, err=>{
    //   console.log(err);
    // })
  }

  changeSelectedDate(date){
    console.log(date)
    this.selectedDate_1 = this.addOrSubractDays(date, 0, false);
    this.selectedDate_2 = this.addOrSubractDays(date, 1, false);
    // console.log("1: "+this.selectedDate_1)
    // console.log("2: "+this.selectedDate_2)


    // this.stockPriceService.getAllStockPrices()
    // .subscribe((res:any)=>{
    //   console.log(res);
    //   this.stockPrices = res;
    // }, err=>{
    //   console.log(err);
    // })

    this.calculatePriceWeighting();
  }

  calculatePriceWeighting(){
    this.stockData = [];
    // let distinctCompanyCodes = Array.from(new Set(this.stockPrices.map((stock:any) => stock.companyCode)));

    // this.stockData = this.stockPrices.filter((stock:any)=>{
    //   return stock.date == this.selectedDate_1 || stock.date == this.selectedDate_2;
    // })


    for(var i=1;i<this.stockPrices.length;i++){
      // let p1 = 0;
      // let p2 = 0;
      if(this.stockPrices[i].date == this.selectedDate_1 
      && 
      this.stockPrices[i-1].date == this.selectedDate_2
      ){
        // p1 += this.stockPrices[i].currentPrice;
        // p2 += this.stockPrices[i-1].currentPrice;
        this.stockData.push({"companyCode": this.stockPrices[i].companyCode, "price_1": this.stockPrices[i].currentPrice, "price_2": this.stockPrices[i-1].currentPrice})
      }
    }
    
    for(var i=0;i<this.stockData.length;i++){
        this.priceWeightingTotal.total_1 += +this.stockData[i].price_1;
        this.priceWeightingTotal.total_2 += +this.stockData[i].price_2;

        this.equalWeightingData.relativeTotal += this.stockData[i].price_2/this.stockData[i].price_1;
        this.geometricMean.productOfRelativePrices *= this.stockData[i].price_2/this.stockData[i].price_1;

        this.valueWeighting.total_1 += this.stockData[i].price_1 * this.outstandingShares[i];
        this.valueWeighting.total_2 += this.stockData[i].price_2 * this.outstandingShares[i];

    }

    console.log(this.stockData);

  }

  addOrSubractDays(startingDate, number, future) {
    let d = null;
    if (future) {
      d = new Date(new Date(startingDate).setDate(new Date(startingDate).getDate() + number));
    } else {
      d = new Date(new Date(startingDate).setDate(new Date(startingDate).getDate() - number));
    }
    return d.toISOString().substring(0,10);
  }

  // changeSelectedCompany(company){
  //   console.log(company)
  //   this.selectedCompany = company;

  //   this.stockData = this.stockPrices.filter((stockPrice:any)=>{
  //     return stockPrice.companyCode == this.selectedCompany;
  //   });
  // }
  }
