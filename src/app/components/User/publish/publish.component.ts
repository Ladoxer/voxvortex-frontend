import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit{
  title: any = "";
  image: any = "";
  content:any = "Hi";
  imageData: any;
  // val="";
  Labels = [];
  labelId: string = "Pick suitable Label for your post";
  // newFormData: FormData;

  constructor(
    private contentService: ContentService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.contentService.title$.subscribe((newTitle) => {
      this.title = newTitle;
    })
    this.contentService.image$.subscribe((imageUrl)=>{
      this.image = imageUrl;
    })
    this.contentService.html$.subscribe((newContent) => {
      this.content = newContent;
    })
    this.contentService.imageData$.subscribe((newimageData) => {
      this.imageData = newimageData;
    })
    
    this.contentService.getAllLabels().subscribe((labels)=>{
      this.Labels = labels;
    });
  }

  

  onSubmit(){
    const userId = localStorage.getItem('userData');
    
    const newFormData = new FormData();
    newFormData.append('userName', userId);
    newFormData.append('title', this.title);
    newFormData.append('image',this.imageData);
    newFormData.append('content',this.content);
    newFormData.append('label',this.labelId);
    
    this.contentService.createBlog(newFormData).subscribe((data)=>{
      this.toastr.success('Blog added Successfully');
    },(err)=>{
      this.toastr.error(err.error.message);
    })
  }
}
