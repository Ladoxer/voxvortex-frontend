import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from 'src/app/services/user-service.service';


@Component({
  selector: 'app-write-content',
  templateUrl: './write-content.component.html',
  styleUrls: ['./write-content.component.css']
})
export class WriteContentComponent implements OnInit {

  form!: FormGroup;
  title!: string;
  html!: string;

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
    private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      'text': new FormControl('')
    })
  }

  public blur(): void {
    console.log('blur');
  }

  public onSelectionChanged(): void {
    console.log('onSelectionChanged');
  }

  onSave() {
    const content = this.form.get('text').value;
    console.log(content);
    
    this.userservice.saveContent(content)
    .subscribe(()=>{
      this.toastr.success("Content saved successfully.");
    },(err)=>{
      this.toastr.error("Error saving content", err);
    })
  }

}
