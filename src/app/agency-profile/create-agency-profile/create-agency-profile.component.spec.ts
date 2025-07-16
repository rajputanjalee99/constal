import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAgencyProfileComponent } from './create-agency-profile.component';

describe('CreateAgencyProfileComponent', () => {
  let component: CreateAgencyProfileComponent;
  let fixture: ComponentFixture<CreateAgencyProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAgencyProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAgencyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
