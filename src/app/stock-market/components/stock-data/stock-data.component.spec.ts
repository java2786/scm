import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDataComponent } from './stock-data.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StockDataComponent', () => {
  let component: StockDataComponent;
  let fixture: ComponentFixture<StockDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockDataComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe("boundary", () => {
    it('should create', () => {
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
      expect(app).toBeDefined;
      expect(component).toBeTruthy();
      expect(component).toBeDefined();
    });
  });
});
