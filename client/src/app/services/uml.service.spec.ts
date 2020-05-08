import { TestBed } from '@angular/core/testing';
import { UmlService } from '../services/uml.service';

describe('UmlService', () => {
  let service: UmlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UmlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
