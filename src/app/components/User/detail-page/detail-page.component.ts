import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/services/content.service';
import { SpeechService } from 'src/app/services/speech.service';
import { UserService } from 'src/app/services/user-service.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css'],
})
export class DetailPageComponent implements OnInit, OnDestroy {
  blogId: string;
  blog: any;
  loginUserId: string;
  isFollowing: boolean = false;
  isLiked: boolean = false;
  isSaved: boolean = false;
  isPremium: boolean = false;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contentService: ContentService,
    private userService: UserService,
    private toastr: ToastrService,
    private speechService: SpeechService,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.blogId = this.route.snapshot.paramMap.get('id');
    this.loginUserId = localStorage.getItem('userData');
    
    this.loadBlog();
  }
  
  loadBlog(): void {
    this.isLoading = true;
    
    this.contentService.getBlogById(this.blogId).subscribe({
      next: (blog) => {
        this.blog = blog;
        this.setSpeechContent(blog.content);
        this.updateMetaTags();
        
        // Load user data after blog is loaded
        if (this.loginUserId) {
          this.loadUserData();
        }
        
        this.isLoading = false;
      },
      error: (err) => {
        this.toastr.error('Failed to load article');
        this.isLoading = false;
      }
    });
  }
  
  loadUserData(): void {
    this.userService.getUser(this.loginUserId).subscribe({
      next: (userData) => {
        this.isPremium = userData?.is_premium;
        this.isFollowing = userData?.following.includes(this.blog?.userName._id);
        this.isLiked = userData.liked.includes(this.blog._id);
        this.isSaved = userData.saved.includes(this.blog._id);
      },
      error: (err) => {
        console.error('Failed to load user data', err);
      }
    });
  }
  
  updateMetaTags(): void {
    if (this.blog) {
      // Update page title
      this.titleService.setTitle(`${this.blog.title} | VoxVortex`);
      
      // Update meta description
      const description = this.getMetaDescription();
      this.metaService.updateTag({ name: 'description', content: description });
      
      // Update Open Graph tags
      this.metaService.updateTag({ property: 'og:title', content: this.blog.title });
      this.metaService.updateTag({ property: 'og:description', content: description });
      
      if (this.blog.image) {
        this.metaService.updateTag({ property: 'og:image', content: this.blog.image });
      }
    }
  }
  
  getMetaDescription(): string {
    // Extract plain text from content and create a short description
    const div = document.createElement('div');
    div.innerHTML = this.blog.content || '';
    const text = div.textContent || div.innerText || '';
    return text.substring(0, 160).trim() + '...';
  }

  onFollow(): void {
    if (!this.loginUserId) {
      this.router.navigate(['/login']);
      return;
    }
    
    this.isFollowing = !this.isFollowing;
    const userId = this.loginUserId;
    const targetId = this.blog.userName._id;
    
    this.userService.toggleFollow(userId, targetId).subscribe({
      next: (data) => {
        this.toastr.success(data.message);
      },
      error: (err) => {
        this.isFollowing = !this.isFollowing; // Revert on error
        this.toastr.error(err.error.message);
      }
    });
  }

  onLike(): void {
    if (!this.loginUserId) {
      this.router.navigate(['/login']);
      return;
    }
    
    // Optimistic UI update
    const previousLikeStatus = this.isLiked;
    const previousLikeCount = this.blog.like;
    
    if (!this.isLiked) {
      this.blog.like += 1;
    } else {
      this.blog.like -= 1;
    }
    this.isLiked = !this.isLiked;
    
    const userId = this.loginUserId;
    const blogId = this.blog._id;

    this.userService.toggleLike(userId, blogId).subscribe({
      next: (data) => {
        this.toastr.success(data.message);
      },
      error: (err) => {
        // Revert on error
        this.isLiked = previousLikeStatus;
        this.blog.like = previousLikeCount;
        this.toastr.error(err.error.message);
      }
    });
  }
  
  onSave(): void {
    if (!this.loginUserId) {
      this.router.navigate(['/login']);
      return;
    }
    
    this.isSaved = !this.isSaved;
    const userId = this.loginUserId;
    const blogId = this.blog._id;
    
    this.userService.toggleSave(userId, blogId).subscribe({
      next: (data) => {
        this.toastr.success(data.message);
      },
      error: (err) => {
        this.isSaved = !this.isSaved; // Revert on error
        this.toastr.error(err.error.message);
      }
    });
  }
  
  shareOn(platform: string): void {
    const url = window.location.href;
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
  
  copyLink(): void {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(
      () => {
        this.toastr.success('Link copied to clipboard');
      },
      () => {
        this.toastr.error('Failed to copy link');
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
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      });
    }
  }
  
  calculateReadingTime(content: string): string {
    if (!content) return '1 min';
    
    // Remove HTML tags if present
    const div = document.createElement('div');
    div.innerHTML = content;
    const text = div.textContent || div.innerText || '';
    
    // Average reading speed: 200 words per minute
    const wordCount = text.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(wordCount / 200));
    
    return `${minutes} min`;
  }

  setSpeechContent(content: string): void {
    if (!content) return;
    
    // Extract text content from HTML
    const div = document.createElement('div');
    div.innerHTML = content;
    const text = div.textContent || div.innerText || '';
    
    this.speechService.setSpeechContent(text);
  }

  startSpeech(): void {
    this.speechService.startSpeech();
    this.toastr.info('Audio playback started');
  }

  pauseSpeech(): void {
    this.speechService.pauseSpeech();
    this.toastr.info('Audio playback paused');
  }

  resumeSpeech(): void {
    this.speechService.resumeSpeech();
    this.toastr.info('Audio playback resumed');
  }

  ngOnDestroy(): void {
    this.speechService.stopSpeech();
  }
}