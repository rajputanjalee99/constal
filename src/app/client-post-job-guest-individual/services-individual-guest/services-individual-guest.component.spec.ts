import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesIndividualGuestComponent } from './services-individual-guest.component';

describe('ServicesIndividualGuestComponent', () => {
  let component: ServicesIndividualGuestComponent;
  let fixture: ComponentFixture<ServicesIndividualGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesIndividualGuestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesIndividualGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
