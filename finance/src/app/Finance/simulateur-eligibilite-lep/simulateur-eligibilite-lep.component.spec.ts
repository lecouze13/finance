import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulateurEligibiliteLepComponent } from './simulateur-eligibilite-lep.component';

describe('SimulateurEligibiliteLepComponent', () => {
  let component: SimulateurEligibiliteLepComponent;
  let fixture: ComponentFixture<SimulateurEligibiliteLepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulateurEligibiliteLepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulateurEligibiliteLepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
