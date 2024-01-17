import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-saved-blogs',
  templateUrl: './saved-blogs.component.html',
  styleUrls: ['./saved-blogs.component.css']
})
export class SavedBlogsComponent implements OnInit {
  savedBlogs = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userData');
    this.userService.getSavedBlogs(userId).subscribe((blogs) => {
      this.savedBlogs = blogs;
    });
    this.userService.toggleProfileIsSave(true);
  }
}
