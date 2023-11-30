import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css'],
})
export class BlogCardComponent implements AfterViewInit {
  @Input() blog;

  summary: string = '';

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    if (this.blog.content) {
      const tempElement = this.renderer.createElement('div');
      tempElement.innerHTML = this.blog.content;

      const paragraphs = tempElement.getElementsByTagName('p');
      if (paragraphs && paragraphs.length > 0) {
        for (let i = 0; i < paragraphs.length; i++) {
          this.summary += paragraphs[i].textContent + ' ';
        }
      }

      this.cdr.detectChanges();
    }
  }
}
