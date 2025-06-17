import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulateurImportLocationNueComponent } from './simulateur-import-location-nue.component';

describe('SimulateurImportLocationNueComponent', () => {
  let component: SimulateurImportLocationNueComponent;
  let fixture: ComponentFixture<SimulateurImportLocationNueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulateurImportLocationNueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulateurImportLocationNueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
