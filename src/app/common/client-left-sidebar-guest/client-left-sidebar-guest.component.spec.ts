import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientLeftSidebarGuestComponent } from './client-left-sidebar-guest.component';

describe('ClientLeftSidebarGuestComponent', () => {
  let component: ClientLeftSidebarGuestComponent;
  let fixture: ComponentFixture<ClientLeftSidebarGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientLeftSidebarGuestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientLeftSidebarGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
