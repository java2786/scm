import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { StockPrice } from '../models/stock-price.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockPriceService {

  constructor(private http: HttpService) { }

  getAllStockPrices(): Observable<StockPrice[]> {
    return this.http.get("/stock-prices").pipe();
  }

  getStockPrice(id: number): Observable<StockPrice> {
    var url = '/stock-prices/' + id;
    return this.http.get(url).pipe();
  }

  addStockPrice(stockExchange: StockPrice): Observable<Boolean> {
    return this.http.post('/stock-prices',stockExchange).pipe();
  }


}
