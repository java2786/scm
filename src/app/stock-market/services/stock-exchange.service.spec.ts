import { TestBed } from '@angular/core/testing';

import { StockExchangeService } from './stock-exchange.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('StockExchangeService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      RouterTestingModule.withRoutes([])]
  }));

  describe('boundary', () => {
    it('should be created', () => {
      const service: StockExchangeService = TestBed.get(StockExchangeService);
      expect(service).toBeTruthy();
    });
  });
});
