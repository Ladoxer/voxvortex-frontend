import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-admin-label',
  templateUrl: './admin-label.component.html',
  styleUrls: ['./admin-label.component.css']
})
export class AdminLabelComponent implements OnInit {
  labelForm !: FormGroup;
  Labels = [];

  constructor(
    private adminService: AdminServiceService,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.labelForm = new FormGroup({
      label: new FormControl("",[
        Validators.required,
        this.trimmedValidator()
      ]),
      description: new FormControl("",[
        Validators.required,
        this.trimmedValidator()
      ])
    })

    this.getLabels();

  }

  getLabels(){
    this.adminService.getAllLabels().subscribe((labels)=>{
      this.Labels = labels;
    });
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

  get label(): FormControl {
    return this.labelForm.get('label') as FormControl;
  }

  get description(): FormControl {
    return this.labelForm.get('description') as FormControl;
  }

  onSubmit() {
    const newLabel = this.labelForm.getRawValue();
    this.labelForm.reset();

    this.adminService.createLabel(newLabel).subscribe((data) => {
      this.toastr.success('Label added successfully!');
      window.location.reload();
    },(err)=>{
      this.toastr.error(err.error.message);
    })
  }

  onModal(label){
    this.labelForm.patchValue({
      label: label.label,
      description: label.description
    })
    const modal = document.getElementById(`label_update_modal_${label._id}`) as HTMLDialogElement;
    if(modal){
      modal.showModal();
    }
  }

  onDelete(labelId: string){
    this.adminService.deleteLabel(labelId).subscribe((data) => {
      this.toastr.warning('Label deleted successfully!');
      this.getLabels();
    },(err)=>{
      this.toastr.error(err.error.message);
    })
  }

  onEdit(labelId: string) {
    const updatedLabel = this.labelForm.getRawValue();
    this.labelForm.reset();
    this.adminService.updateLabel(labelId,updatedLabel).subscribe((data) => {
      this.toastr.success('Label updated successfully!');
      this.getLabels();
    },(err)=>{
      this.toastr.error(err.error.message);
    })
  }

}
