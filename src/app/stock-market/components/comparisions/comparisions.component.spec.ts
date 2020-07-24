import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisionsComponent } from './comparisions.component';
import { ChartsModule } from 'ng2-charts';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ComparisionsComponent', () => {
  let component: ComparisionsComponent;
  let fixture: ComponentFixture<ComparisionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparisionsComponent ],
      imports: [ChartsModule,
          RouterTestingModule,
          HttpClientTestingModule,
        ]
  
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('boundary', ()=>{
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  })
});
