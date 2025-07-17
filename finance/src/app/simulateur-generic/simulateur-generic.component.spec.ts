import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulateurGenericComponent } from './simulateur-generic.component';

describe('SimulateurGenericComponent', () => {
  let component: SimulateurGenericComponent;
  let fixture: ComponentFixture<SimulateurGenericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulateurGenericComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulateurGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
