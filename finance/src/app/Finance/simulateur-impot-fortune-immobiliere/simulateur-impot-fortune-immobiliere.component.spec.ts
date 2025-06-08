import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulateurImpotFortuneImmobiliereComponent } from './simulateur-impot-fortune-immobiliere.component';

describe('SimulateurImpotFortuneImmobiliereComponent', () => {
  let component: SimulateurImpotFortuneImmobiliereComponent;
  let fixture: ComponentFixture<SimulateurImpotFortuneImmobiliereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulateurImpotFortuneImmobiliereComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulateurImpotFortuneImmobiliereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
