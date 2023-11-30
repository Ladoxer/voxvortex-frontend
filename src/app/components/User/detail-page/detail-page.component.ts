import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/services/content.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css'],
})
export class DetailPageComponent implements OnInit {
  blogId: string;
  blog: any;
  loginUserId: string;
  isFollowing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private contentService: ContentService,
    private userService: UserServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.blogId = this.route.snapshot.paramMap.get('id');
    this.loginUserId = localStorage.getItem('userData');

    this.contentService.getBlogById(this.blogId).subscribe((blog)=>{
      this.blog = blog;
    })

    this.userService.getUser(this.loginUserId).subscribe((userData)=>{
      this.isFollowing = userData.following.include(this.blog.id);
      console.log(this.isFollowing);
      
    })
  }

  onFollow(){
    this.isFollowing = !this.isFollowing;
    const userId = this.loginUserId;
    const targetId = this.blog.userName._id;
    this.userService.toggleFollow(userId,targetId).subscribe((data)=>{
      console.log(data);
      
      this.toastr.success(data.message);
    },(err)=>{
      console.log(err);
      
      this.toastr.error(err.error.message);
    })
  }
}
