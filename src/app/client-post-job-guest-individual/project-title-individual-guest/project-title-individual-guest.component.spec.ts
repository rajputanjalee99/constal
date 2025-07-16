import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTitleIndividualGuestComponent } from './project-title-individual-guest.component';

describe('ProjectTitleIndividualGuestComponent', () => {
  let component: ProjectTitleIndividualGuestComponent;
  let fixture: ComponentFixture<ProjectTitleIndividualGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTitleIndividualGuestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTitleIndividualGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
