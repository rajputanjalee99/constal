import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisibilityTalentPreferencesComponent } from './visibility-talent-preferences.component';

describe('VisibilityTalentPreferencesComponent', () => {
  let component: VisibilityTalentPreferencesComponent;
  let fixture: ComponentFixture<VisibilityTalentPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisibilityTalentPreferencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisibilityTalentPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
