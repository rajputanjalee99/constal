import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedinReferralComponent } from './linkedin-referral.component';

describe('LinkedinReferralComponent', () => {
  let component: LinkedinReferralComponent;
  let fixture: ComponentFixture<LinkedinReferralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkedinReferralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkedinReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
