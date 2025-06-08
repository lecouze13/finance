import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulateurIndependaceFinanciereComponent } from './simulateur-independace-financiere.component';

describe('SimulateurIndependaceFinanciereComponent', () => {
  let component: SimulateurIndependaceFinanciereComponent;
  let fixture: ComponentFixture<SimulateurIndependaceFinanciereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulateurIndependaceFinanciereComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulateurIndependaceFinanciereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
