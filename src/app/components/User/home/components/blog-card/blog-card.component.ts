import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css'],
})
export class BlogCardComponent implements OnInit,AfterViewInit {
  @Input() blog;
  isSaved: boolean = false;

  summary: string = '';


  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userData');
    if(userId){
      this.userService.getUser(userId).subscribe((userData) => {
        this.isSaved = userData.saved.includes(this.blog._id);
      })
    }
  }

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

  onSave() {
    this.isSaved = !this.isSaved;
    const userId = localStorage.getItem('userData');
    const blogId = this.blog._id;

    this.userService.toggleSave(userId,blogId).subscribe((data) => {
      this.toastr.success(data.message);
    },(err)=>{
      this.toastr.error(err.error.message);
    })
  }

  formatDate(date: string): string {
    const currentDate = new Date();
    const blogDate = new Date(date);
    const isCurrentYear = currentDate.getFullYear() === blogDate.getFullYear();

    if(isCurrentYear){
      return this.datePipe.transform(blogDate, 'MMM d');
    }
    return this.datePipe.transform(blogDate, 'MMM d, y');
  }

  calculateReadingTime(content: string): string {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);

    return `${minutes} min read`;
  }
}
