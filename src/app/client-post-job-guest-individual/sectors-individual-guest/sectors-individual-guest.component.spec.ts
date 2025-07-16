import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorsIndividualGuestComponent } from './sectors-individual-guest.component';

describe('SectorsIndividualGuestComponent', () => {
  let component: SectorsIndividualGuestComponent;
  let fixture: ComponentFixture<SectorsIndividualGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectorsIndividualGuestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorsIndividualGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
