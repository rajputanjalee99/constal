import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialityIndividualGuestComponent } from './speciality-individual-guest.component';

describe('SpecialityIndividualGuestComponent', () => {
  let component: SpecialityIndividualGuestComponent;
  let fixture: ComponentFixture<SpecialityIndividualGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialityIndividualGuestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialityIndividualGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
