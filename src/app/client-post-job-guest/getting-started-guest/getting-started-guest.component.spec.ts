import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GettingStartedGuestComponent } from './getting-started-guest.component';

describe('GettingStartedGuestComponent', () => {
  let component: GettingStartedGuestComponent;
  let fixture: ComponentFixture<GettingStartedGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GettingStartedGuestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GettingStartedGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
