import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlanComponent } from './admin-plan.component';

describe('AdminPlanComponent', () => {
  let component: AdminPlanComponent;
  let fixture: ComponentFixture<AdminPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPlanComponent]
    });
    fixture = TestBed.createComponent(AdminPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
