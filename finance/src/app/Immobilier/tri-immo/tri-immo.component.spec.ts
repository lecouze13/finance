import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriImmoComponent } from './tri-immo.component';

describe('TriImmoComponent', () => {
  let component: TriImmoComponent;
  let fixture: ComponentFixture<TriImmoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TriImmoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TriImmoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
