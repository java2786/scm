import { Component, OnInit } from '@angular/core';
import { StockPriceService } from '../../services/stock-price.service';
import { StockPrice } from '../../models/stock-price.model';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company.model';

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


  // outstandingShares: number[] = [1000, 2000, 100000, 5000, 4000, 6200, 6000];
  // outstandingShares: number[] = [];
  
  weightingData:any = {  }

  stockPriceWeightingData: any[];
  constructor(private stockPriceService: StockPriceService, private companyService: CompanyService) {
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

    // this.companyService.getAllCompanies()
    // .subscribe((res:any)=>{
    //   console.log(res);
    //   // this.stockPrices = res;
    //   this.outstandingShares = res.map((company:Company)=>company.outstandingShares)
    //   console.log(this.outstandingShares);
    // }, err=>{
    //   console.log(err);
    // })


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
        this.stockData.push({"companyCode": this.stockPrices[i].companyCode, "price_1": this.stockPrices[i].currentPrice, "price_2": this.stockPrices[i-1].currentPrice, "outstandingShares": this.stockPrices[i].outstandingShares})
      }
    }
    
    for(var i=0;i<this.stockData.length;i++){
        this.weightingData.priceTotal_1 += +this.stockData[i].price_1;
        this.weightingData.priceTotal_2 += +this.stockData[i].price_2;

        this.weightingData.relativeTotal += this.stockData[i].price_2/this.stockData[i].price_1;
        this.weightingData.productOfRelativePrices *= this.stockData[i].price_2/this.stockData[i].price_1;

        this.weightingData.valueTotal_1 += this.stockData[i].price_1 * this.stockData[i].outstandingShares;
        this.weightingData.valueTotal_2 += this.stockData[i].price_2 * this.stockData[i].outstandingShares;



    }

    console.log(this.stockData);
    console.log(this.weightingData);

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
