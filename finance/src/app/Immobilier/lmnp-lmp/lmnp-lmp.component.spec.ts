import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LmnpLmpComponent } from './lmnp-lmp.component';

describe('LmnpLmpComponent', () => {
  let component: LmnpLmpComponent;
  let fixture: ComponentFixture<LmnpLmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LmnpLmpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LmnpLmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
