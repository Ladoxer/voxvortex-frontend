import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelTabsComponent } from './label-tabs.component';

describe('LabelTabsComponent', () => {
  let component: LabelTabsComponent;
  let fixture: ComponentFixture<LabelTabsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabelTabsComponent]
    });
    fixture = TestBed.createComponent(LabelTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
