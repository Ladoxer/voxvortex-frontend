import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/services/content.service';
import { UserServiceService } from 'src/app/services/user-service.service';


@Component({
  selector: 'app-write-content',
  templateUrl: './write-content.component.html',
  styleUrls: ['./write-content.component.css']
})
export class WriteContentComponent implements OnInit {

  contentForm!: FormGroup;
  title!: string;
  html!: string;
  selectedImage: File | null;

  quillConfig = {
    toolbar:{
      container:[
        ['bold','italic','underline','strike'],
        ['blockquote', 'code-block'],

        [{'header':1},{'header':2}],
        [{'size':['xsmall','small','medium','large','xlarge']}],
        [{'align':[]}],
        ['clean'],
        ['link','image','video']
      ]
    }
  }

  constructor(
    private userservice: UserServiceService,
    private toastr: ToastrService,
    private router: Router,
    private contentService: ContentService
  ) {

  }

  ngOnInit(): void {
    this.contentForm = new FormGroup({
      'title': new FormControl(null,Validators.required),
      'image': new FormControl(null,Validators.required),
      'content': new FormControl(null,Validators.required),
    })
  }

  public blur(): void {
    console.log('blur');
  }

  public onSelectionChanged(): void {
    console.log('onSelectionChanged');
  }

  onSelectedImage(event){
    this.selectedImage = event.target.files[0]
    
  }

  onPublish() {
    const title = this.contentForm.get('title').value;
    const image = this.contentForm.get('image').value;
    const content = this.contentForm.get('content').value;
    
    const imageUrl = URL.createObjectURL(this.selectedImage)
    // const formDataImage = new FormData();
    // formDataImage.append('image', this.selectedImage);


    console.log(title+" "+ imageUrl +" "+content);
    console.log(this.selectedImage);
    
    // this.html = content;
    this.contentService.updateContent(title,imageUrl,content,this.selectedImage);
    this.router.navigate(['/publish']);
  }

}
