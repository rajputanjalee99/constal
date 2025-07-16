import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJobPostingComponent } from './view-job-posting.component';

describe('ViewJobPostingComponent', () => {
  let component: ViewJobPostingComponent;
  let fixture: ComponentFixture<ViewJobPostingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewJobPostingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewJobPostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
