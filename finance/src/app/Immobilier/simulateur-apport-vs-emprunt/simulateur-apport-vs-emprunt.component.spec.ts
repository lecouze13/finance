import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulateurApportVsEmpruntComponent } from './simulateur-apport-vs-emprunt.component';

describe('SimulateurApportVsEmpruntComponent', () => {
  let component: SimulateurApportVsEmpruntComponent;
  let fixture: ComponentFixture<SimulateurApportVsEmpruntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulateurApportVsEmpruntComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulateurApportVsEmpruntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
