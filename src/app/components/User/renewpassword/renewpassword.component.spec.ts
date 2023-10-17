import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewpasswordComponent } from './renewpassword.component';

describe('RenewpasswordComponent', () => {
  let component: RenewpasswordComponent;
  let fixture: ComponentFixture<RenewpasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RenewpasswordComponent]
    });
    fixture = TestBed.createComponent(RenewpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
