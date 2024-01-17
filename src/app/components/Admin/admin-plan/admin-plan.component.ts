import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin-service.service';
import { ConfirmationDailogComponent } from '../../Shared/confirmation-dailog/confirmation-dailog.component';

@Component({
  selector: 'app-admin-plan',
  templateUrl: './admin-plan.component.html',
  styleUrls: ['./admin-plan.component.css']
})
export class AdminPlanComponent implements OnInit {
  planForm!: FormGroup;
  Plans = [];

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

    ngOnInit(): void {
      this.planForm = new FormGroup({
        itemName: new FormControl('', [
          Validators.required,
          this.trimmedValidator()
        ]),
        description: new FormControl('', [
          Validators.required,
          this.trimmedValidator()
        ]),
        itemsAmount: new FormControl('', [
          Validators.required
        ]),
        // interval: new FormControl('', [
        //   Validators.required
        // ]),
        period: new FormControl('Select Plan Period', [
          Validators.required,
          this.periodValidator(),
          this.uniqueValidator()
        ])
      });

      this.getPlans();
    }

    getPlans() {
      this.adminService.getAllPlans().subscribe((plans) => {
        this.Plans = plans;
      })
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

    periodValidator() {
      return (control: FormControl) => {
        const value = control.value;
        if (value && value === 'Select Plan Period') {
          return {required: true};
        }
        return null;
      }
    }

    uniqueValidator() {
      return (control: FormControl) => {
        const value = control.value;
        
        if(this.Plans.some(plan => plan.period === value)){
          return {existing: true};
        }

        return null;
      }
    }

    get itemName(): FormControl {
      return this.planForm.get('itemName') as FormControl;
    }

    get description(): FormControl {
      return this.planForm.get('description') as FormControl
    }

    get itemsAmount(): FormControl {
      return this.planForm.get('itemsAmount') as FormControl;
    }

    get period(): FormControl {
      return this.planForm.get('period') as FormControl;
    }

    // .....

    onSubmit() {
      const planDetails = this.planForm.getRawValue();

      console.log(planDetails);
      

      // Check unique period..

      this.planForm.reset();

      this.adminService.createPlan(planDetails).subscribe({
        next: (data) => {
          this.toastr.success('New plan added successfully!');
          this.getPlans();
        },
        error: (err) => {
          this.toastr.error(err.error.message);
        }
      })
    }

    onDelete(planId: string) {
      this.adminService.deletePlan(planId).subscribe({
        next: (data) => {
          this.toastr.success(data.responce);
          this.getPlans();
        },
        error: (err) => {
          this.toastr.error(err.error);
        }
      })
    }


    openConfirmationDialog(planId: string): void {
      const dailogRef = this.dialog.open(ConfirmationDailogComponent, {
        width: '300px',
        data: 'Are you sure you want to delete this plan?'
      });

      dailogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.onDelete(planId);
        }
      });
    }
}
