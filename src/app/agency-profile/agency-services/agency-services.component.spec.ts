import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyServicesComponent } from './agency-services.component';

describe('AgencyServicesComponent', () => {
  let component: AgencyServicesComponent;
  let fixture: ComponentFixture<AgencyServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencyServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
