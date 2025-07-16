import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPostGuestComponent } from './review-post-guest.component';

describe('ReviewPostGuestComponent', () => {
  let component: ReviewPostGuestComponent;
  let fixture: ComponentFixture<ReviewPostGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewPostGuestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewPostGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
