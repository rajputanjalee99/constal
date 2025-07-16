import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisibilityPreferencesComponent } from './visibility-preferences.component';

describe('VisibilityPreferencesComponent', () => {
  let component: VisibilityPreferencesComponent;
  let fixture: ComponentFixture<VisibilityPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisibilityPreferencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisibilityPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
