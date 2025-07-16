import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentifyVerificationComponent } from './identify-verification.component';

describe('IdentifyVerificationComponent', () => {
  let component: IdentifyVerificationComponent;
  let fixture: ComponentFixture<IdentifyVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdentifyVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentifyVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
