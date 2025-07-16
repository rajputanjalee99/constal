import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralResetPasswordComponent } from './referral-reset-password.component';

describe('ReferralResetPasswordComponent', () => {
  let component: ReferralResetPasswordComponent;
  let fixture: ComponentFixture<ReferralResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferralResetPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
