import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  commentForm !: FormGroup;
  @Input() blogId: string;
  comments = [];

  constructor(private contentService: ContentService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      text: new FormControl("",[
        Validators.required,
        this.trimmedValidator()
      ]),
    });
    this.getCommets();
  }

  getCommets(){
    if(this.blogId){
      this.contentService.getComments(this.blogId).subscribe((data: []) => {
        console.log(data);
        
        this.comments = data;
      })
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

  onSubmit(){
    const userName = localStorage.getItem('userData');
    const comment = this.commentForm.getRawValue();
    const text = comment.text;
    const createdAt = new Date();

    const newComment = {userName, text, createdAt}
    // console.log(newComment);
    


    if(this.blogId) {
      this.contentService.addComment(this.blogId,newComment).subscribe((data)=>{
        this.toastr.success(data.message);
        this.comments.push(newComment);
      })
    }
    this.getCommets();
  }
}
