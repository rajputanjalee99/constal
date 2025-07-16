import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostReviewIndividualGuestComponent } from './post-review-individual-guest.component';

describe('PostReviewIndividualGuestComponent', () => {
  let component: PostReviewIndividualGuestComponent;
  let fixture: ComponentFixture<PostReviewIndividualGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostReviewIndividualGuestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostReviewIndividualGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
