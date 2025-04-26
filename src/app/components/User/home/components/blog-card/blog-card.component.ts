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
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css'],
})
export class BlogCardComponent implements OnInit,AfterViewInit {
  @Input() blog;
  summary: string = '';
  isSaved: boolean = false;
  isLiked: boolean = false;
  isFollowing: boolean = false;
  imageLoaded: boolean = false;


  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
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

  onLike(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    const userId = localStorage.getItem('userData');
    if (!userId) {
      // Navigate to login if not authenticated
      return;
    }
    
    this.isLiked = !this.isLiked;
    // Call your API to like/unlike
  }

  onSave(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    const userId = localStorage.getItem('userData');
    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }
  
    this.isSaved = !this.isSaved;
    const blogId = this.blog._id;
  
    this.userService.toggleSave(userId, blogId).subscribe(
      (data) => {
        this.toastr.success(data.message);
      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    );
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      // Today - show hours
      const hours = Math.floor(diffTime / (1000 * 60 * 60));
      if (hours === 0) {
        const minutes = Math.floor(diffTime / (1000 * 60));
        return minutes === 0 ? 'Just now' : `${minutes}m ago`;
      }
      return `${hours}h ago`;
    } else if (diffDays < 7) {
      // Less than a week
      return `${diffDays}d ago`;
    } else {
      // More than a week - show date
      const isCurrentYear = now.getFullYear() === date.getFullYear();
      if (isCurrentYear) {
        return this.datePipe.transform(date, 'MMM d');
      }
      return this.datePipe.transform(date, 'MMM d, y');
    }
  }

  calculateReadingTime(content: string): string {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);

    return `${minutes} min read`;
  }

  shareOn(platform: string, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    const url = `${window.location.origin}/detailpage/${this.blog._id}`;
    const text = `Check out this article: ${this.blog.title}`;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  }
  
  copyLink(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    const url = `${window.location.origin}/detailpage/${this.blog._id}`;
    navigator.clipboard.writeText(url).then(
      () => {
        this.toastr.success('Link copied to clipboard');
      },
      () => {
        this.toastr.error('Failed to copy link');
      }
    );
  }

  checkFollowingStatus(): void {
    const userId = localStorage.getItem('userData');
    if (!userId) return;
    
    // Implement based on your API
    // This would check if the current user follows the blog author
  }

  onImageLoad(): void {
    this.imageLoaded = true;
  }
}
