import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparateurSciIrIsComponent } from './comparateur-sci-ir-is.component';

describe('ComparateurSciIrIsComponent', () => {
  let component: ComparateurSciIrIsComponent;
  let fixture: ComponentFixture<ComparateurSciIrIsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComparateurSciIrIsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparateurSciIrIsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
