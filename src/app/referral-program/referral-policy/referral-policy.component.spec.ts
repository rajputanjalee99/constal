import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralPolicyComponent } from './referral-policy.component';

describe('ReferralPolicyComponent', () => {
  let component: ReferralPolicyComponent;
  let fixture: ComponentFixture<ReferralPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferralPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
