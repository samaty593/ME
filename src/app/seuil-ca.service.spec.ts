import { TestBed } from '@angular/core/testing';

import { SeuilCaService } from './seuil-ca.service';

describe('SeuiCaService', () => {
  let service: SeuilCaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeuilCaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
