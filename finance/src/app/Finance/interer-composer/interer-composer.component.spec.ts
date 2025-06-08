import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntererComposerComponent } from './interer-composer.component';

describe('IntererComposerComponent', () => {
  let component: IntererComposerComponent;
  let fixture: ComponentFixture<IntererComposerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntererComposerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntererComposerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
