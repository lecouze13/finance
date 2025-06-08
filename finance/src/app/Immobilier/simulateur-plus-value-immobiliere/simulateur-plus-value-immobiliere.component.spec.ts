import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulateurPlusValueImmobiliereComponent } from './simulateur-plus-value-immobiliere.component';

describe('SimulateurPlusValueImmobiliereComponent', () => {
  let component: SimulateurPlusValueImmobiliereComponent;
  let fixture: ComponentFixture<SimulateurPlusValueImmobiliereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulateurPlusValueImmobiliereComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulateurPlusValueImmobiliereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
