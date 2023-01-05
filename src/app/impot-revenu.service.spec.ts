import { TestBed } from '@angular/core/testing';

import { ImpotRevenuService } from './impot-revenu.service';

describe('ImpotRevenuService', () => {
  let service: ImpotRevenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpotRevenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
