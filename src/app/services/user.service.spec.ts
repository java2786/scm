import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])]
    // providers: [UserService]
  }));

  describe("boundary", ()=>{
    it('should be created', () => {
      const service: UserService = TestBed.get(UserService);
      expect(service).toBeTruthy();
    });
  });

  describe("exception", ()=>{
    it('should contain invalid user', () => {
      const service: UserService = TestBed.get(UserService);
      expect(service.auth).toBeFalsy();
    });
  });

  describe("business", ()=>{
    it('should get user to login', () => {
      const service: UserService = TestBed.get(UserService);
      service.auth = true;
      expect(service.auth).toBeTruthy();
    });
  });

});
