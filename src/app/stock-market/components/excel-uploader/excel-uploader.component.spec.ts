import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelUploaderComponent } from './excel-uploader.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ExcelUploaderComponent', () => {
  let component: ExcelUploaderComponent;
  let fixture: ComponentFixture<ExcelUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelUploaderComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('boundary', ()=>{
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  })
});
