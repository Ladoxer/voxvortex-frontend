import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/services/content.service';
import { SpeechService } from 'src/app/services/speech.service';
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
  isLiked: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private contentService: ContentService,
    private userService: UserServiceService,
    private toastr: ToastrService,
    private speechService: SpeechService
  ) {}

  ngOnInit(): void {
    this.blogId = this.route.snapshot.paramMap.get('id');
    this.loginUserId = localStorage.getItem('userData');

    this.contentService.getBlogById(this.blogId).subscribe((blog)=>{
      this.blog = blog;
      // ...
      this.setSpeechContent(blog.content);
    })

    this.userService.getUser(this.loginUserId).subscribe((userData)=>{
      this.isFollowing = userData?.following.includes(this.blog?.userName._id);
      // console.log(userData.liked);
      this.isLiked = userData.liked.includes(this.blog._id);
    })
  }

  onFollow(){
    this.isFollowing = !this.isFollowing;
    const userId = this.loginUserId;
    const targetId = this.blog.userName._id;
    this.userService.toggleFollow(userId,targetId).subscribe({next:(data)=>{
      this.toastr.success(data.message);
    },error:(err)=>{
      this.toastr.error(err.error.message);
    }})
  }

  onLike(){
    if(!this.isLiked){
      this.blog.like += 1;
    }else{
      this.blog.like -= 1;
    }
    this.isLiked = !this.isLiked;
    const userId = localStorage.getItem('userData');
    const blogId = this.blog._id;

    this.userService.toggleLike(userId,blogId).subscribe({next:(data) => {
      this.toastr.success(data.message);
    },error:(err)=>{
      this.toastr.error(err.error.message);
    }})
  }

  setSpeechContent(content: string): void {
    this.speechService.setSpeechContent('Hi Fasil');
  }

  startSpeech(): void{
    this.speechService.startSpeech();
  }

  pauseSpeech(): void{
    this.speechService.pauseSpeech();
  }

  resumeSpeech(): void{
    this.speechService.resumeSpeech();
  }
}
