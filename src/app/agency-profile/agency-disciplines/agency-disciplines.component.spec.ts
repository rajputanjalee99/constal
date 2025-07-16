import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyDisciplinesComponent } from './agency-disciplines.component';

describe('AgencyDisciplinesComponent', () => {
  let component: AgencyDisciplinesComponent;
  let fixture: ComponentFixture<AgencyDisciplinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencyDisciplinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyDisciplinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
