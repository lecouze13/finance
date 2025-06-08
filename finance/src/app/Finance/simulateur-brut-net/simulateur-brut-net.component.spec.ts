import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulateurBrutNetComponent } from './simulateur-brut-net.component';

describe('SimulateurBrutNetComponent', () => {
  let component: SimulateurBrutNetComponent;
  let fixture: ComponentFixture<SimulateurBrutNetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulateurBrutNetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulateurBrutNetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
