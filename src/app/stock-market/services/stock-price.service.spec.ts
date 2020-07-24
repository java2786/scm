import { TestBed } from '@angular/core/testing';

import { StockPriceService } from './stock-price.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StockPriceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule, 
      RouterTestingModule.withRoutes([])]
  }));

 describe("boundary", ()=>{
  it('should be created', () => {
    const service: StockPriceService = TestBed.get(StockPriceService);
    expect(service).toBeTruthy();
  });
 })
});
