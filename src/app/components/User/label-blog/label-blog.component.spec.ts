import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelBlogComponent } from './label-blog.component';

describe('LabelBlogComponent', () => {
  let component: LabelBlogComponent;
  let fixture: ComponentFixture<LabelBlogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabelBlogComponent]
    });
    fixture = TestBed.createComponent(LabelBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
