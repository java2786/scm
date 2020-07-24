import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockIndicesComponent } from './stock-indices.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StockIndicesComponent', () => {
  let component: StockIndicesComponent;
  let fixture: ComponentFixture<StockIndicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockIndicesComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockIndicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('boundary', ()=>{
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  })
});
