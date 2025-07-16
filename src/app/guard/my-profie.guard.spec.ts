import { TestBed } from '@angular/core/testing';

import { MyProfieGuard } from './my-profie.guard';

describe('MyProfieGuard', () => {
  let guard: MyProfieGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MyProfieGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
