import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulateurAplComponent } from './simulateur-apl.component';

describe('SimulateurAplComponent', () => {
  let component: SimulateurAplComponent;
  let fixture: ComponentFixture<SimulateurAplComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulateurAplComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulateurAplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
