import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirbnbVsLocationComponent } from './airbnb-vs-location.component';

describe('AirbnbVsLocationComponent', () => {
  let component: AirbnbVsLocationComponent;
  let fixture: ComponentFixture<AirbnbVsLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirbnbVsLocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirbnbVsLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
