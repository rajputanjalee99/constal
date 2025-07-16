import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralDbComponent } from './referral-db.component';

describe('ReferralDbComponent', () => {
  let component: ReferralDbComponent;
  let fixture: ComponentFixture<ReferralDbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferralDbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
