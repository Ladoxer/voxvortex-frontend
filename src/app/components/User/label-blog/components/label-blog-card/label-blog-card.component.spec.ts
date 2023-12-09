import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelBlogCardComponent } from './label-blog-card.component';

describe('LabelBlogCardComponent', () => {
  let component: LabelBlogCardComponent;
  let fixture: ComponentFixture<LabelBlogCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabelBlogCardComponent]
    });
    fixture = TestBed.createComponent(LabelBlogCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
