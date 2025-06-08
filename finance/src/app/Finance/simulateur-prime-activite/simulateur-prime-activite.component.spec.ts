import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulateurPrimeActiviteComponent } from './simulateur-prime-activite.component';

describe('SimulateurPrimeActiviteComponent', () => {
  let component: SimulateurPrimeActiviteComponent;
  let fixture: ComponentFixture<SimulateurPrimeActiviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulateurPrimeActiviteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulateurPrimeActiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
