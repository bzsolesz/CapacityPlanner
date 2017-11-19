import { TestBed, inject } from '@angular/core/testing';

import { ChildService } from './child.service';

describe('ChildService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChildService]
    });
  });

  it('should be created', inject([ChildService], (service: ChildService) => {
    expect(service).toBeTruthy();
  }));
});