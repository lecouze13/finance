import { TestBed } from '@angular/core/testing';

import { TaxBracketService } from './tax-bracket.service';

describe('TaxBracketService', () => {
  let service: TaxBracketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxBracketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
