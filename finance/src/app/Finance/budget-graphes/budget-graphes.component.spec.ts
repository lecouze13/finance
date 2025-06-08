import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetGraphesComponent } from './budget-graphes.component';

describe('BudgetGraphesComponent', () => {
  let component: BudgetGraphesComponent;
  let fixture: ComponentFixture<BudgetGraphesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetGraphesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetGraphesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
