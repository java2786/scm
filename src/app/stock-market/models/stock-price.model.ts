import { Time } from '@angular/common';

export class StockPrice {
    id: number;
    companyCode: string;
    stockExchange?: string;
    currentPrice: number;
    date: Date;
    time: Time;
}
