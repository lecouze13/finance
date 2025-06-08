import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparateurAchatLocationComponent } from './comparateur-achat-location.component';

describe('ComparateurAchatLocationComponent', () => {
  let component: ComparateurAchatLocationComponent;
  let fixture: ComponentFixture<ComparateurAchatLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComparateurAchatLocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparateurAchatLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
