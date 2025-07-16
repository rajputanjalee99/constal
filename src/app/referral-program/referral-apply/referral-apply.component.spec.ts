import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralApplyComponent } from './referral-apply.component';

describe('ReferralApplyComponent', () => {
  let component: ReferralApplyComponent;
  let fixture: ComponentFixture<ReferralApplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferralApplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
