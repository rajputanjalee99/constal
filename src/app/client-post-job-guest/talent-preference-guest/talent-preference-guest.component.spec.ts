import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentPreferenceGuestComponent } from './talent-preference-guest.component';

describe('TalentPreferenceGuestComponent', () => {
  let component: TalentPreferenceGuestComponent;
  let fixture: ComponentFixture<TalentPreferenceGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentPreferenceGuestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentPreferenceGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
