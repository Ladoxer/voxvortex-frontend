import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/services/content.service';
import { ConfirmDeactivate } from '../../Guards/confirmation.guard';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmationDailogComponent } from '../../Shared/confirmation-dailog/confirmation-dailog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit, OnDestroy, ConfirmDeactivate{
  title: any = "";
  image: any = "";
  content:any = "";
  imageData: any;
  // val="";
  Labels = [];
  labelId: string = "Pick suitable Label for your post";
  // newFormData: FormData;
  isSubmitting = false;

  // subscriptions
  subscriptions: Subscription[] = [];

  constructor(
    private route: Router,
    private contentService: ContentService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.contentService.title$.subscribe((newTitle) => {
        this.title = newTitle;
      })
    )
    this.subscriptions.push(
      this.contentService.image$.subscribe((imageUrl)=>{
        this.image = imageUrl;
      })
    )
    this.subscriptions.push(
      this.contentService.html$.subscribe((newContent) => {
        this.content = newContent;
      })
    )
    this.subscriptions.push(
      this.contentService.imageData$.subscribe((newimageData) => {
        this.imageData = newimageData;
      })
    );
    // ...
    this.contentService.getAllLabels().subscribe((labels)=>{
      this.Labels = labels;
    });
    // ...
    if(!this.title || !this.image || !this.content || !this.imageData) {
      this.isSubmitting = true;
      this.route.navigate(['/']);
    }
  }

  

  onSubmit(){
    this.isSubmitting = true;

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
    this.route.navigate(['/']);

  }

  isLabelSelected(): boolean {
    return this.labelId !== null && this.labelId !== 'Pick suitable Label for your post';
  }

  canDeactivate(): boolean {
    if(this.isSubmitting) {
      this.isSubmitting = false;
      return true;
    }

    if(confirm('Are you sure you want to leave this page? Leaving now will discard the draft.')) {
      return true;
    } else {
      return false;
    }
    // this.openConfirmationDialog()
  }


  //? will add
  openConfirmationDialog(): void {
    const dailogRef = this.dialog.open(ConfirmationDailogComponent, {
      width: '300px',
      data: 'Are you sure you want to leave this page? Leaving now will discard the draft.'
    });

    dailogRef.afterClosed().subscribe(result => {
      if(result) {
        return true;
      } else {
        return false;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
