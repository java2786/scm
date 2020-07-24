import { async, ComponentFixture, TestBed, tick, fakeAsync, inject } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { LoginGuard } from 'src/app/guards/login.guard';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let element: any;
  let location: Location;

  let router: Router;
  // let mockRouter = {
  //   navigate: jasmine.createSpy('navigate'),
  //   myMethod: () => { navigate: jasmine.createSpy('navigate') }
  // };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule, HttpClientModule, RouterTestingModule.withRoutes([
          {path: 'stock-market', loadChildren: './stock-market/stock-market.module#StockMarketModule', canActivate: [LoginGuard]},
        ]),],
      providers: [//UserService
        // { provide: Router, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.nativeElement;
    router = TestBed.get(Router);
    location = TestBed.get(Location);
  });


  describe("business", ()=>{
    it("should validate email feild", () => {
      let email = component.loginForm.controls["email"];
      expect(email.valid).toBeFalsy();

      email.setValue("abc@gmail.com");
      expect(email.valid).toBeTruthy();
    });
    it("should validate password feild", () => {
      let password = component.loginForm.controls["password"];
      expect(password.valid).toBeFalsy();

      password.setValue("123");
      expect(password.valid).toBeTruthy();
    });


    // need
    it('should get login with valid data', fakeAsync(()=>{
      let email = component.loginForm.controls["email"];
      email.setValue("abc@gmail.com");
      expect(email.valid).toBeTruthy();

      let password = component.loginForm.controls["password"];
      password.setValue("123");
      expect(password.valid).toBeTruthy();

      
      fixture.detectChanges();
      spyOn(component,'onSubmit');
      let loginBtn = element.querySelector("input[type='submit']");
      expect(loginBtn).toBeDefined();
    loginBtn.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(1);

      

      // console.log(location.path());

    }));
   
  });
  describe("exception", ()=>{
    it("should contain invalid form when empty", () => {
      expect(component.loginForm.valid).toBeFalsy();
    });

    it("should fail email validation with invalid email-id 'abc'", () => {
      let errors = {};
      let email = component.loginForm.controls["email"];
      expect(email.valid).toBeFalsy();
  
      email.setValue("abc");
      errors = email.errors;

      expect(errors).toBeDefined();
      expect(email.valid).toBeFalsy();
    });
  });
  describe("boundary", ()=>{
    it('should be createted', () => {
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
      expect(app).toBeDefined;
      expect(component).toBeTruthy();
      expect(component).toBeDefined();
    });    
    
    it("should not validate empty email", () => {
      let email = component.loginForm.controls["email"];
      expect(email.valid).toBeFalsy();
    });
  })

});
