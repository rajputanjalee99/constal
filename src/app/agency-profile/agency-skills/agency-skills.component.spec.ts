import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencySkillsComponent } from './agency-skills.component';

describe('AgencySkillsComponent', () => {
  let component: AgencySkillsComponent;
  let fixture: ComponentFixture<AgencySkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencySkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencySkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
