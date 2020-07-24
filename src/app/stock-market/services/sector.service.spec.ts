import { TestBed } from '@angular/core/testing';

import { SectorService } from './sector.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('SectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      RouterTestingModule.withRoutes([])]
  }));

  describe('boundary', () => {

    it('should be created', () => {
      const service: SectorService = TestBed.get(SectorService);
      expect(service).toBeTruthy();
    });
    it('should be created 2', () => {
      const service: SectorService = TestBed.get(SectorService);
      expect(service).toBeTruthy();
    });

  });
});
