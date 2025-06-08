import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulateurRetraiteComponent } from './simulateur-retraite.component';

describe('SimulateurRetraiteComponent', () => {
  let component: SimulateurRetraiteComponent;
  let fixture: ComponentFixture<SimulateurRetraiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulateurRetraiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulateurRetraiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
