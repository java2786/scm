import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { StockExchange } from '../models/stock-exchange.model';

@Injectable({
  providedIn: 'root'
})
export class StockExchangeService {

  constructor(private http: HttpService) { }

  getAllStockExchanges(): Observable<StockExchange[]> {
    return this.http.get("/stock_exchanges").pipe();
  }

  getExchange(id: number): Observable<StockExchange> {
    var url = '/stock_exchanges/' + id;
    return this.http.get(url).pipe();
  }

  addStockExchange(stockExchange: StockExchange): Observable<Boolean> {
    return this.http.post('/stock_exchanges',stockExchange).pipe();
  }


}
