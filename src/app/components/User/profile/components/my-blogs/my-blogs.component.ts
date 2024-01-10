import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-my-blogs',
  templateUrl: './my-blogs.component.html',
  styleUrls: ['./my-blogs.component.css']
})
export class MyBlogsComponent implements OnInit {

  myBlogs = [];

  constructor(private userService: UserServiceService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userData');
    this.userService.getMyBlogs(userId).subscribe((blogs)=>{      
      this.myBlogs = blogs;
    });
    this.userService.toggleProfileIsSave(false);
  }
}
