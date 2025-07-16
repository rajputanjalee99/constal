import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralLoginComponent } from './referral-login.component';

describe('ReferralLoginComponent', () => {
  let component: ReferralLoginComponent;
  let fixture: ComponentFixture<ReferralLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferralLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
