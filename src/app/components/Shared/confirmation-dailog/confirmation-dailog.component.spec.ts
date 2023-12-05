import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDailogComponent } from './confirmation-dailog.component';

describe('ConfirmationDailogComponent', () => {
  let component: ConfirmationDailogComponent;
  let fixture: ComponentFixture<ConfirmationDailogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationDailogComponent]
    });
    fixture = TestBed.createComponent(ConfirmationDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
