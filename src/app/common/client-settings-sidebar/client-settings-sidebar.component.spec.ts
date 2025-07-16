import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSettingsSidebarComponent } from './client-settings-sidebar.component';

describe('ClientSettingsSidebarComponent', () => {
  let component: ClientSettingsSidebarComponent;
  let fixture: ComponentFixture<ClientSettingsSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientSettingsSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSettingsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
