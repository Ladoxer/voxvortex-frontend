import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/services/content.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  commentForm!: FormGroup;
  @Input() blogId: string;
  comments = [];
  currentUser: any;
  isLoadingMoreComments = false;
  hasMoreComments = true;
  commentsPage = 1;
  commentsPerPage = 5;
  
  constructor(
    private contentService: ContentService, 
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Initialize form with validators
    this.commentForm = new FormGroup({
      text: new FormControl("", [
        Validators.required,
        this.trimmedValidator()
      ]),
    });
    
    // Load current user data
    const userId = localStorage.getItem('userData');
    if (userId) {
      this.userService.getUser(userId).subscribe(userData => {
        this.currentUser = userData;
      });
    }
    
    // Load comments
    this.getComments();
  }

  getComments() {
    if (this.blogId) {
      this.contentService.getComments(this.blogId).subscribe({
        next: (data: any[]) => {
          this.comments = data;
          // Sort comments by newest first
          this.sortComments('newest');
        },
        error: (error) => {
          this.toastr.error('Failed to load comments');
          console.error('Error loading comments:', error);
        }
      });
    }
  }
  
  loadMoreComments() {
    if (!this.blogId || this.isLoadingMoreComments) return;
    
    this.isLoadingMoreComments = true;
    this.commentsPage++;
    
    this.contentService.getComments(this.blogId, this.commentsPage, this.commentsPerPage).subscribe({
      next: (data: any[]) => {
        if (data.length === 0) {
          this.hasMoreComments = false;
        } else {
          this.comments = [...this.comments, ...data];
        }
        this.isLoadingMoreComments = false;
      },
      error: (error) => {
        this.toastr.error('Failed to load more comments');
        this.isLoadingMoreComments = false;
        console.error('Error loading more comments:', error);
      }
    });
  }

  sortComments(order: 'newest' | 'oldest') {
    if (order === 'newest') {
      this.comments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else {
      this.comments.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }
  }

  trimmedValidator() {
    return (control: FormControl) => {
      const value = control.value;
      if (value && value.trim() === '') {
        return { trimmed: true, required: true };
      }
      return null;
    };
  }

  onSubmit() {
    if (!this.commentForm.valid) return;
    
    const userId = localStorage.getItem('userData');
    if (!userId) {
      this.toastr.warning('Please log in to post a comment');
      return;
    }
    
    const commentText = this.commentForm.get('text').value.trim();
    const createdAt = new Date();
    
    // Optimistic UI update
    const optimisticComment = {
      _id: 'temp-' + Date.now(),
      text: commentText,
      createdAt: createdAt,
      userName: this.currentUser || { _id: userId, name: 'You' }
    };
    
    // Add to top of comments list (assuming newest first)
    this.comments.unshift(optimisticComment);
    
    // Reset form
    this.commentForm.reset();
    
    // Send to server
    this.contentService.addComment(this.blogId, { 
      userName: userId, 
      text: commentText, 
      createdAt 
    }).subscribe({
      next: (response) => {
        this.toastr.success(response.message);
        // Remove optimistic comment and add real one
        const index = this.comments.findIndex(c => c._id === optimisticComment._id);
        if (index !== -1) {
          this.comments.splice(index, 1);
        }
        this.getComments(); // Refresh comments to get server-generated data
      },
      error: (error) => {
        // Remove optimistic comment on error
        const index = this.comments.findIndex(c => c._id === optimisticComment._id);
        if (index !== -1) {
          this.comments.splice(index, 1);
        }
        this.toastr.error('Failed to post comment');
        console.error('Error posting comment:', error);
      }
    });
  }
  
  formatDate(dateString: string): string {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
  
  getTimeAgo(dateString: string): string {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffMinutes < 1) {
      return 'Just now';
    } else if (diffMinutes < 60) {
      return `${diffMinutes}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return this.formatDate(dateString);
    }
  }
}