import { TestBed } from '@angular/core/testing';

import { CompanyService } from './company.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('CompanyService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule, 
      RouterTestingModule.withRoutes([])]
  }));

  describe("business", ()=>{
    
    it('should get ajax data from apis', () => {
      const service: CompanyService = TestBed.get(CompanyService);
      expect(service).toBeTruthy();
      
      expectAsync(service.getAllCompanies().toPromise()).toBeResolved();

      service.getAllCompanies().subscribe(res => expect(res.length).toBeGreaterThan(0));

    });
  });

  describe("boundary", ()=>{
    
    it('should be created', () => {
      const service: CompanyService = TestBed.get(CompanyService);
      expect(service).toBeTruthy();
    });
  });
});