import { TestBed } from '@angular/core/testing';

import { RoomrateService } from './roomrate.service';

describe('RoomrateService', () => {
  let service: RoomrateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomrateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
