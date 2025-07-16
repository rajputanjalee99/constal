import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplinesIndividualGuestComponent } from './disciplines-individual-guest.component';

describe('DisciplinesIndividualGuestComponent', () => {
  let component: DisciplinesIndividualGuestComponent;
  let fixture: ComponentFixture<DisciplinesIndividualGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisciplinesIndividualGuestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplinesIndividualGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
