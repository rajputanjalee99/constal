import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteForInterviewComponent } from './invite-for-interview.component';

describe('InviteForInterviewComponent', () => {
  let component: InviteForInterviewComponent;
  let fixture: ComponentFixture<InviteForInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteForInterviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteForInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
