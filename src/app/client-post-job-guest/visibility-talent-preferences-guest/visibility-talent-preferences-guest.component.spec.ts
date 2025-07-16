import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisibilityTalentPreferencesGuestComponent } from './visibility-talent-preferences-guest.component';

describe('VisibilityTalentPreferencesGuestComponent', () => {
  let component: VisibilityTalentPreferencesGuestComponent;
  let fixture: ComponentFixture<VisibilityTalentPreferencesGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisibilityTalentPreferencesGuestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisibilityTalentPreferencesGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
