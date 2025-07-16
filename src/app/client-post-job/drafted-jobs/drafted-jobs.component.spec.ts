import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftedJobsComponent } from './drafted-jobs.component';

describe('DraftedJobsComponent', () => {
  let component: DraftedJobsComponent;
  let fixture: ComponentFixture<DraftedJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraftedJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
