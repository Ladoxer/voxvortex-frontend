import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  Blogs = [];

  constructor(
    private contentService: ContentService
  ) {}

  ngOnInit(): void {
    this.contentService.getAllBlogs().subscribe((blogs) => {
      this.Blogs = blogs;
    })
  }
}
