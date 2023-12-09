import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { ConfirmationDailogComponent } from '../../Shared/confirmation-dailog/confirmation-dailog.component';

@Component({
  selector: 'app-admin-label',
  templateUrl: './admin-label.component.html',
  styleUrls: ['./admin-label.component.css']
})
export class AdminLabelComponent implements OnInit {
  labelForm !: FormGroup;
  Labels = [];

  itemsPerPage = 9;
  currentPage = 1;

  constructor(
    private adminService: AdminServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog
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

  get paginatedLabels(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.Labels.slice(startIndex, endIndex);
  }

  get totalPages(): number[] {
    return Array(Math.ceil(this.Labels.length / this.itemsPerPage))
    .fill(0)
    .map((_,index) => index + 1);
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  onSubmit() {
    const newLabel = this.labelForm.getRawValue();

    const newLabelValue = this.labelForm.value.label.toLowerCase();
    const labelExists = this.Labels.some(
      (label) => label.label.toLowerCase() === newLabelValue
    );

    if (labelExists) {
      this.labelForm.get('label')?.setErrors({labelExists: true});
      return;
    }
    
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
    this.adminService.deleteLabel(labelId).subscribe({
      next: (data) => {
      this.toastr.warning('Label deleted successfully!');
      this.getLabels();
    },
    error:(err)=>{
      this.toastr.error(err.error.message);
    }})
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

  openConfirmationDialog(labelId: string): void {
    const dailogRef = this.dialog.open(ConfirmationDailogComponent, {
      width: '300px',
      data: 'Are you sure you want to delete this label?'
    });

    dailogRef.afterClosed().subscribe(result => {
      if(result) {
        this.onDelete(labelId);
      }
    });
  }

}
