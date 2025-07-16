import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralTermsComponent } from './referral-terms.component';

describe('ReferralTermsComponent', () => {
  let component: ReferralTermsComponent;
  let fixture: ComponentFixture<ReferralTermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferralTermsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
