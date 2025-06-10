import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateurArticleComponent } from './generateur-article.component';

describe('GenerateurArticleComponent', () => {
  let component: GenerateurArticleComponent;
  let fixture: ComponentFixture<GenerateurArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateurArticleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateurArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
