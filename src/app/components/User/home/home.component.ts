import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin-service.service';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  Blogs = [];
  Labels = [];
  followingBlogs = [];

  // load more...
  blogsChunckSize = 3;
  blogsOffset = 0;

  followingBlogsChunkSize = 3;
  followingBlogsOffset = 0;

  constructor(
    private contentService: ContentService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.loadAllBlogs();
    this.adminService.getAllLabels().subscribe((data) => {
      this.Labels = data;
    });
    if(localStorage.getItem('userData')){
      this.loadFollowing();
    }
  }

  loadAllBlogs() {
    this.contentService.getAllBlogs(this.blogsChunckSize, this.blogsOffset).subscribe((blogs) => {
      this.Blogs = this.Blogs.concat(blogs);
      this.blogsOffset += this.blogsChunckSize;
    })
  }

  loadFollowing() {
    const userId = localStorage.getItem('userData');
    this.contentService.getFollowingBlogs(userId, this.followingBlogsChunkSize, this.followingBlogsOffset).subscribe((blogs) => {
      this.followingBlogs = this.followingBlogs.concat(blogs);
      this.followingBlogsOffset += this.followingBlogsChunkSize;
    });
  }
}
