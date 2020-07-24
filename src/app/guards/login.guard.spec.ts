import { TestBed, async, inject } from '@angular/core/testing';

import { LoginGuard } from './login.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginGuard],
      imports: [
        HttpClientTestingModule, 
        RouterTestingModule.withRoutes([])
      ]
  
    });
  });

  describe('boundary', ()=>{
    
    it('should create', inject([LoginGuard], (guard: LoginGuard) => {
      expect(guard).toBeTruthy();
    }));
  })
});
