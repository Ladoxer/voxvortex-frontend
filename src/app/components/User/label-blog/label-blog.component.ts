import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-label-blog',
  templateUrl: './label-blog.component.html',
  styleUrls: ['./label-blog.component.css']
})
export class LabelBlogComponent implements OnInit {
  labelId: string;
  labelData: {_id: string, label: string, description: string};

  labeledBlog: [];
  

  constructor(private userService: UserServiceService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.labelId = this.route.snapshot.paramMap.get('id');
    this.userService.getLabelById(this.labelId).subscribe((data:{_id: string, label: string, description: string})=>{
      this.labelData = data;
    });

    this.userService.getBlogsByLabelId(this.labelId).subscribe((data)=>{
      this.labeledBlog = data;
    })
  }


}
