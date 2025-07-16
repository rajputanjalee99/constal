import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentBudgetIndividualGuestComponent } from './talent-budget-individual-guest.component';

describe('TalentBudgetIndividualGuestComponent', () => {
  let component: TalentBudgetIndividualGuestComponent;
  let fixture: ComponentFixture<TalentBudgetIndividualGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentBudgetIndividualGuestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentBudgetIndividualGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
