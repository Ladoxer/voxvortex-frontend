import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedBlogsComponent } from './saved-blogs.component';

describe('SavedBlogsComponent', () => {
  let component: SavedBlogsComponent;
  let fixture: ComponentFixture<SavedBlogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavedBlogsComponent]
    });
    fixture = TestBed.createComponent(SavedBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
