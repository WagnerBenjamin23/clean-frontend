import { TestBed } from '@angular/core/testing';

import { DashboarService } from './dashboar.service';

describe('DashboarService', () => {
  let service: DashboarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
