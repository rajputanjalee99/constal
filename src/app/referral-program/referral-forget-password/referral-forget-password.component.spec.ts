import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralForgetPasswordComponent } from './referral-forget-password.component';

describe('ReferralForgetPasswordComponent', () => {
  let component: ReferralForgetPasswordComponent;
  let fixture: ComponentFixture<ReferralForgetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferralForgetPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralForgetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
