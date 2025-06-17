import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulateurDividendFireComponent } from './simulateur-dividend-fire.component';

describe('SimulateurDividendFireComponent', () => {
  let component: SimulateurDividendFireComponent;
  let fixture: ComponentFixture<SimulateurDividendFireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulateurDividendFireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulateurDividendFireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
