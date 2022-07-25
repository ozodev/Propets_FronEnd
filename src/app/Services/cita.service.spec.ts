import { TestBed } from '@angular/core/testing';

import { CITAService } from './cita.service';

describe('CITAService', () => {
  let service: CITAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CITAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
