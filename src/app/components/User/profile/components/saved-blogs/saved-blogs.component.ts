import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-saved-blogs',
  templateUrl: './saved-blogs.component.html',
  styleUrls: ['./saved-blogs.component.css']
})
export class SavedBlogsComponent implements OnInit {
  savedBlogs = [];

  constructor(private userService: UserServiceService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userData');
    this.userService.getSavedBlogs(userId).subscribe((blogs) => {
      this.savedBlogs = blogs;
    });
    this.userService.toggleProfileIsSave(true);
  }
}
