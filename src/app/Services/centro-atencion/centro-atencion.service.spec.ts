import { TestBed } from '@angular/core/testing';

import { CentroAtencionService } from './centro-atencion.service';

describe('CentroAtencionService', () => {
  let service: CentroAtencionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentroAtencionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
