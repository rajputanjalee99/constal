import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTitleGuestComponent } from './post-title-guest.component';

describe('PostTitleGuestComponent', () => {
  let component: PostTitleGuestComponent;
  let fixture: ComponentFixture<PostTitleGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostTitleGuestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostTitleGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
