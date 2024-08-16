import { TestBed } from '@angular/core/testing';

import { EnvelopeStateService } from './envelope-state.service';

describe('EnvelopeStateService', () => {
  let service: EnvelopeStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvelopeStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
