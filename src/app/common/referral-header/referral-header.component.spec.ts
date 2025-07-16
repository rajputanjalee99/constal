import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralHeaderComponent } from './referral-header.component';

describe('ReferralHeaderComponent', () => {
  let component: ReferralHeaderComponent;
  let fixture: ComponentFixture<ReferralHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferralHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
