import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpotsRevenueComponent } from './impots-revenue.component';

describe('ImpotsRevenueComponent', () => {
  let component: ImpotsRevenueComponent;
  let fixture: ComponentFixture<ImpotsRevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImpotsRevenueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImpotsRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
