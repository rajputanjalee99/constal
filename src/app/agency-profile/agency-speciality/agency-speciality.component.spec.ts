import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencySpecialityComponent } from './agency-speciality.component';

describe('AgencySpecialityComponent', () => {
  let component: AgencySpecialityComponent;
  let fixture: ComponentFixture<AgencySpecialityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencySpecialityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencySpecialityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
