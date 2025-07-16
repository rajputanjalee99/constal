import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisibilityPreferencesGuestComponent } from './visibility-preferences-guest.component';

describe('VisibilityPreferencesGuestComponent', () => {
  let component: VisibilityPreferencesGuestComponent;
  let fixture: ComponentFixture<VisibilityPreferencesGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisibilityPreferencesGuestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisibilityPreferencesGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
