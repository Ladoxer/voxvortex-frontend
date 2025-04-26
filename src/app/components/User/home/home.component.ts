import { Component, HostListener, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin-service.service';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isLoadingBlogs = false;
  isLoadingFollowing = false;
  Blogs = [];
  Labels = [];
  followingBlogs = [];
  activeTabIndex = 0;

  // load more...
  blogsChunckSize = 3;
  blogsOffset = 0;
  hasMoreBlogs = true;

  followingBlogsChunkSize = 3;
  followingBlogsOffset = 0;
  hasMoreFollowingBlogs = true;

  constructor(
    private contentService: ContentService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.loadAllBlogs();
    this.adminService.getAllLabels().subscribe((data) => {
      this.Labels = data;
    });
    if (localStorage.getItem('userData')) {
      this.loadFollowing();
    }
  }

  onTabChange(event: any): void {
    this.activeTabIndex = event.index;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (this.isScrolledToBottom()) {
      this.loadMoreContent();
    }
  }

  isScrolledToBottom(): boolean {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    // Load more when user is 200px from bottom of page
    return documentHeight - (scrollTop + windowHeight) < 200;
  }

  loadMoreContent(): void {
    if (
      this.activeTabIndex === 0 &&
      !this.isLoadingBlogs &&
      this.hasMoreBlogs
    ) {
      this.loadAllBlogs();
    } else if (
      this.activeTabIndex === 1 &&
      !this.isLoadingFollowing &&
      this.hasMoreFollowingBlogs
    ) {
      this.loadFollowing();
    }
  }

  loadAllBlogs() {
    if (this.isLoadingBlogs || !this.hasMoreBlogs) return;

    this.isLoadingBlogs = true;
    this.contentService
      .getAllBlogs(this.blogsChunckSize, this.blogsOffset)
      .subscribe(
        (blogs) => {
          if (blogs && blogs.length > 0) {
            this.Blogs = this.Blogs.concat(blogs);
            this.blogsOffset += this.blogsChunckSize;
          } else {
            this.hasMoreBlogs = false;
          }
          this.isLoadingBlogs = false;
        },
        (error) => {
          console.error('Error loading blogs:', error);
          this.isLoadingBlogs = false;
        }
      );
  }

  loadFollowing() {
    if (this.isLoadingFollowing || !this.hasMoreFollowingBlogs) return;

    this.isLoadingFollowing = true;
    const userId = localStorage.getItem('userData');

    this.contentService
      .getFollowingBlogs(
        userId,
        this.followingBlogsChunkSize,
        this.followingBlogsOffset
      )
      .subscribe(
        (blogs) => {
          if (blogs && blogs.length > 0) {
            this.followingBlogs = this.followingBlogs.concat(blogs);
            this.followingBlogsOffset += this.followingBlogsChunkSize;
          } else {
            this.hasMoreFollowingBlogs = false;
          }
          this.isLoadingFollowing = false;
        },
        (error) => {
          console.error('Error loading following blogs:', error);
          this.isLoadingFollowing = false;
        }
      );
  }
}
