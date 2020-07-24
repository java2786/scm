import { Component, OnInit } from '@angular/core';
import { StockPriceService } from '../../services/stock-price.service';
import { StockPrice } from '../../models/stock-price.model';

@Component({
  selector: 'app-stock-indices',
  templateUrl: './stock-indices.component.html',
  styleUrls: ['./stock-indices.component.scss']
})
export class StockIndicesComponent implements OnInit {

  selectedDate_1: string = null;
  selectedDate_2: string = null;
  stockData: any[] = [];
  stockPrices: any[];
  Math:Math = Math;


  outstandingShares: number[] = [1000, 2000, 100000, 5000, 4000, 6200, 6000];
  
  weightingData:any = {
  //   priceTotal_1: 0,
  //   priceTotal_2: 0,

  //   relativeTotal: 0,

  //   valueTotal_1: 0,
  //   valueTotal_2: 0,

  //   productOfRelativePrices: 1
  }

  // priceWeightingTotal:any = {
  //   total_1: 0,
  //   total_2: 0
  // }
  // equalWeightingData: any = {
  //   relativeTotal: 0
  // };

  // valueWeighting: any = {
  //   total_1: 0,
  //   total_2: 0
  // }

  // geometricMean:any = {
  //   productOfRelativePrices: 1
  // }

  stockPriceWeightingData: any[];
  constructor(private stockPriceService: StockPriceService) {
    this.resetWeightingData();
   }

   resetWeightingData(){
    this.weightingData = {
        priceTotal_1: 0,
        priceTotal_2: 0,
    
        relativeTotal: 0,
    
        valueTotal_1: 0,
        valueTotal_2: 0,
    
        productOfRelativePrices: 1
      }
   }

  ngOnInit() {

    this.stockPriceService.getAllStockPrices()
    .subscribe((res:any)=>{
      console.log(res);
      this.stockPrices = res;
    }, err=>{
      console.log(err);
    })
  }

  changeSelectedDate(date){
    console.log(date)
    this.selectedDate_1 = this.addOrSubractDays(date, 0, false);
    this.selectedDate_2 = this.addOrSubractDays(date, 1, false);

    this.calculateWeightings();
  }

  calculateWeightings(){
    this.resetWeightingData();
    this.stockData = [];
    for(var i=1;i<this.stockPrices.length;i++){

      if(this.stockPrices[i].date == this.selectedDate_1 
      && 
      this.stockPrices[i-1].date == this.selectedDate_2
      ){
        this.stockData.push({"companyCode": this.stockPrices[i].companyCode, "price_1": this.stockPrices[i].currentPrice, "price_2": this.stockPrices[i-1].currentPrice})
      }
    }
    
    for(var i=0;i<this.stockData.length;i++){
        this.weightingData.priceTotal_1 += +this.stockData[i].price_1;
        this.weightingData.priceTotal_2 += +this.stockData[i].price_2;

        this.weightingData.relativeTotal += this.stockData[i].price_2/this.stockData[i].price_1;
        this.weightingData.productOfRelativePrices *= this.stockData[i].price_2/this.stockData[i].price_1;

        this.weightingData.valueTotal_1 += this.stockData[i].price_1 * this.outstandingShares[i];
        this.weightingData.valueTotal_2 += this.stockData[i].price_2 * this.outstandingShares[i];

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

}
