import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDbHeaderComponent } from './client-db-header.component';

describe('ClientDbHeaderComponent', () => {
  let component: ClientDbHeaderComponent;
  let fixture: ComponentFixture<ClientDbHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientDbHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDbHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
