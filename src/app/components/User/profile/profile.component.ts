import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { SubscriptionService } from '../../../services/subscription.service';
import { UserService } from '../../../services/user-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
 isSaved: boolean;
 isSavedSubscription: Subscription;
 profileData;
 folowers: [{name: string}];
 followings: [{name: string}];
 planDetails: any;

 profileForm !: FormGroup;

 constructor(private userService: UserService, private toastr: ToastrService, private subscriptionService: SubscriptionService) {}

 ngOnInit(): void {
   const userId = localStorage.getItem('userData'); 
   this.isSavedSubscription = this.userService.profileIsSave$.subscribe((value: boolean) => {
    this.isSaved = value;
   });
   this.userService.getUser(userId).subscribe((userData) => {
    console.log('userData+++',userData);
    
    this.profileData = userData;
   });
   this.userService.getFollowers(userId).subscribe((followers) => {
    this.folowers = followers;
   });
   this.userService.getFollowings(userId).subscribe((followings)=>{
    this.followings = followings;
   });

   this.profileForm = new FormGroup({
      name: new FormControl("", [
        Validators.required,
        this.trimmedValidator()
      ]),
      mobile: new FormControl("", [
        Validators.required,
        this.trimmedValidator()
      ]),
      email: new FormControl("", [
        Validators.required,
        this.trimmedValidator()
      ])
   })
 }

 trimmedValidator() {
  return (control: FormControl) => {
    const value = control.value;
    if (value &&  typeof value === 'string' && value.trim() === '') {
      return { trimmed: true, required: true };
    }
    return null;
  };
}

onEdit() {
  this.profileForm.patchValue({
    name: this.profileData.name,
    mobile: this.profileData.mobile,
    email: this.profileData.email
  });

  const modal = document.getElementById('edit_profile_modal') as HTMLDialogElement;
  if(modal){
    modal.showModal();
  }
}

onPlanSetting() {
  const userId = localStorage.getItem('userData');
  this.subscriptionService.getUserPlan(userId).subscribe((plan)=>{
    this.planDetails = plan;
  })
  const modal = document.getElementById('plan_setting_modal') as HTMLDialogElement;
  if(modal){
    modal.showModal();
  }
}

onSubmit(){
  const userId = localStorage.getItem('userData');
  const updatedProfileData = this.profileForm.getRawValue();
  this.userService.updateUser(userId,updatedProfileData).subscribe({
    next: (data) => {
      this.toastr.success(data);
      window.location.reload();
    },
    error: (err) => {
      this.toastr.error(err.error.message);
    }
  })
}

get name(): FormControl {
  return this.profileForm.get('name') as FormControl;
}

get mobile(): FormControl {
  return this.profileForm.get('mobile') as FormControl;
}

onCancelSub(){
  const userId = localStorage.getItem('userData');
  this.subscriptionService.getUserSubscription(userId).subscribe((sub:any) => {
    this.subscriptionService.cancelSubscription(sub.subscriptionId).subscribe({
      next:(res: {success:boolean,message:string}) => {
        this.toastr.success(res.message);
        setTimeout(()=>{
          window.location.reload();
        },1500)
      },
      error:(err: {success:boolean,message:string}) => {
        this.toastr.error(err.message);
      }
    })
  })
}

 ngOnDestroy(): void {
   if(this.isSavedSubscription){
    this.isSavedSubscription.unsubscribe();
   }
 }
}
