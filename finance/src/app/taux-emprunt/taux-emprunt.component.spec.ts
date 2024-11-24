import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TauxEmpruntComponent } from './taux-emprunt.component';

describe('TauxEmpruntComponent', () => {
  let component: TauxEmpruntComponent;
  let fixture: ComponentFixture<TauxEmpruntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TauxEmpruntComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TauxEmpruntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
