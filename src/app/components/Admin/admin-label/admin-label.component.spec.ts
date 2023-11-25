import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLabelComponent } from './admin-label.component';

describe('AdminLabelComponent', () => {
  let component: AdminLabelComponent;
  let fixture: ComponentFixture<AdminLabelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminLabelComponent]
    });
    fixture = TestBed.createComponent(AdminLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
