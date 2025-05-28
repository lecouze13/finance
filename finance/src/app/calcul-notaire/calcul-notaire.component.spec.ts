import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculNotaireComponent } from './calcul-notaire.component';

describe('CalculNotaireComponent', () => {
  let component: CalculNotaireComponent;
  let fixture: ComponentFixture<CalculNotaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculNotaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculNotaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
